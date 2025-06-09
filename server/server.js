import express from "express";
import dotenv from "dotenv";
import userRoutes from './src/routes/userRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import songRoutes from './src/routes/songRoutes.js';
import albumRoutes from './src/routes/albumRoutes.js';
import statsRoutes from './src/routes/statsRoutes.js';

import mongoose from 'mongoose'




dotenv.config();

const app = express();
const PORT = process.env.PORT;


app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(()=>console.log("MongoDB Connected✅✅✅✅"))
   .catch((error) => console.error("❌connection error", error))

app.listen(PORT, () => {
  console.log("Server is listening on PORT 🚀🚀🚀 " + PORT);
});
