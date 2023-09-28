import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.CLIENT_URL!, process.env.ADMIN_URL!],
    credentials: true,
  })
);

// routes
import adminRoutes from './routes/adminRoutes';
import userRoutes from './routes/userRoutes';
import videoRoutes from './routes/videoRoutes';

app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/video', videoRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
