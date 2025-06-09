import { Router } from "express"
import { User } from "../models/userModels.js";
import { authCallback } from "../controllers/authControllers.js";

const router = Router()

router.post("/callback", authCallback)




export default router