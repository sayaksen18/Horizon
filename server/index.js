import express from 'express';
import dotenv from 'dotenv';
import ConnectDB from './config/connectDB.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/auth.route.js';
dotenv.config();
ConnectDB();

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))

app.use("/api/auth",authRouter);



app.use(express.json());
app.use(cookieParser());


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});