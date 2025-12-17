import express from "express";
import cors from 'cors'
import 'dotenv/config'
import authRoutes from './routes/auth.routes.js'
import bookingRoutes from './routes/booking.routes.js'
import approvalRoutes from './routes/approval.routes.js'
import vehicleRoutes from './routes/vehicle.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js'

const app = express();

// Enable CORS for your frontend
app.use(cors({
  origin: "http://localhost:3000", // allow your frontend origin
  credentials: true, // if you send cookies or auth headers
}));

app.get("/", (req, res) => {
  res.send("Fleet BE running 🚀");
});

app.get("/api/health", (req, res) => {
  res.send("Fleet BE running 🚀");
});

app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/bookings', approvalRoutes)
app.use('/api/vehicles', vehicleRoutes)
app.use('/api/dashboard', dashboardRoutes)

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
