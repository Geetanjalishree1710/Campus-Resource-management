import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())

const resourceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    capacity: { type: Number, required: true },
    status: { type: String, enum: ['Available', 'Booked', 'Maintenance'], default: 'Available' },
    location: String,
})


const bookingSchema = new mongoose.Schema({
    resourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource', required: true },
    requester: { type: String, required: true },
    purpose: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
}, { timestamps: true })

const Resource = mongoose.model('Resource', resourceSchema)
const Booking = mongoose.model('Booking', bookingSchema)

const demoResources = [
    { name: 'Innovation Lab', code: 'LAB-204', type: 'Computer lab', capacity: 42, status: 'Available', location: 'South Wing' },
    { name: 'Senate Hall', code: 'HALL-01', type: 'Seminar hall', capacity: 180, status: 'Booked', location: 'Main Block' },
    { name: 'North Studio', code: 'ROOM-116', type: 'Classroom', capacity: 60, status: 'Available', location: 'North Wing' },
    { name: 'Media Suite', code: 'EQP-07', type: 'Equipment', capacity: 1, status: 'Maintenance', location: 'Library' },
]

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'campus-os-api' }))
app.get('/api/resources', async(_req, res) => {
    const resources = mongoose.connection.readyState === 1 ? await Resource.find().sort({ name: 1 }) : demoResources
    res.json(resources)
})
app.get('/api/dashboard', async(_req, res) => {
    const live = mongoose.connection.readyState === 1
    const [resourceCount, pendingBookings, approvedBookings] = live
        ?
        await Promise.all([Resource.countDocuments(), Booking.countDocuments({ status: 'Pending' }), Booking.countDocuments({ status: 'Approved' })]) : [38, 8, 24]
    res.json({ resourceCount, pendingBookings, approvedBookings, utilizationRate: 76, resourceHealth: 94 })
})
app.post('/api/bookings', async(req, res) => {
    const { resourceId, date, startTime, endTime } = req.body
    if (!resourceId || !date || !startTime || !endTime || startTime >= endTime) return res.status(400).json({ message: 'Valid resource and time range are required.' })
    if (mongoose.connection.readyState !== 1) return res.status(201).json({ message: 'Booking request received in demo mode.', status: 'Pending' })
    const conflict = await Booking.exists({ resourceId, date: new Date(date), status: { $in: ['Pending', 'Approved'] }, startTime: { $lt: endTime }, endTime: { $gt: startTime } })
    if (conflict) return res.status(409).json({ message: 'That resource is already booked for this time.' })
    const booking = await Booking.create(req.body)
    res.status(201).json(booking)
})
app.patch('/api/bookings/:id/approve', async(req, res) => {
    if (mongoose.connection.readyState !== 1) return res.json({ status: 'Approved', id: req.params.id })
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'Approved' }, { new: true })
    if (!booking) return res.status(404).json({ message: 'Booking not found.' })
    res.json(booking)
})

const start = async() => {
    if (process.env.MONGODB_URI) {
        try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('MongoDB connected')
        } catch (error) { console.warn(`MongoDB unavailable, using demo data: ${error.message}`) }
    } else console.log('MONGODB_URI not set, using demo data')
    app.listen(port, () => console.log(`Campus OS API listening on http://localhost:${port}`))
}
start()