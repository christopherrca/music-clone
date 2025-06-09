import { Router } from "express"
import { getAdmin } from "../controllers/adminControllers.js"

const router = Router()

router.get("/", getAdmin)


export default router