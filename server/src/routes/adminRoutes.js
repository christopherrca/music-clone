import { Router } from "express"
import { protectRoute, requireAdmin } from "../middleware/authMiddleware.js"
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from "../controllers/adminControllers.js"

const router = Router()


router.use(protectRoute, requireAdmin)


router.get("/check", checkAdmin )


router.post("/songs", createSong)
router.delete("/songs/:id", deleteSong)


router.post("/albums", createAlbum)
router.delete("/albums/:id", deleteAlbum)



// delete song ====> /api/admin/songs/:id
// delete song ====> /api/admin/songs/123


export default router