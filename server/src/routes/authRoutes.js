import { Router } from "express"

const router = Router()

router.get("/", (req, res) => {
    res.send("AUTH Route")
})


export default router