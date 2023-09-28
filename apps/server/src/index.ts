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

app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
