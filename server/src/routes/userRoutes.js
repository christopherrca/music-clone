import { Router } from "express"

const router = Router()

router.get("/", (req, res) => {
  res.send("HOME ROUTE / 🎧");
});




export default router