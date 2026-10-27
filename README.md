# campusOS

MERN starter for intelligent campus resource management.

## Run locally

```powershell
npm install
npm install --prefix server
npm install --prefix client
npm run dev
```

The React dashboard runs on Vite's local URL and the Express API runs on `http://localhost:5000`. Copy `server/.env.example` to `server/.env` to connect MongoDB. Without MongoDB, the API serves demo campus data so the UI can still be explored.

## API

- `GET /api/health`
- `GET /api/dashboard`
- `GET /api/resources`
- `POST /api/bookings`
- `PATCH /api/bookings/:id/approve`
