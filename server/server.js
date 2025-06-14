import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from '@clerk/express'
import userRoutes from './src/routes/userRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import songRoutes from './src/routes/songRoutes.js';
import albumRoutes from './src/routes/albumRoutes.js';
import statsRoutes from './src/routes/statsRoutes.js';


import mongoose from 'mongoose'
import fileUpload from "express-fileupload";
import path from "path"


dotenv.config();


const __dirname = path.resolve()
const app = express();
const PORT = process.env.PORT;


// Pass no parameters

app.use(express.json())
app.use(clerkMiddleware())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
        fileSize: 10 * 1024 * 1024,
    }
}))

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);



// error handling
app.use((err, req, res, next)=> {
    res.status(500).json({message: process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message})
})


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(()=>console.log("MongoDB Connected✅✅✅✅"))
   .catch((error) => console.error("❌connection error", error))

app.listen(PORT, () => {
  console.log("Server is listening on PORT 🚀🚀🚀 " + PORT);
});