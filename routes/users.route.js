const express = require("express");
const router = express.Router()
const userControllers = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middleware")


router.get("/", authMiddleware, userControllers.getAllUsers)
router.get("/:id",authMiddleware, userControllers.getUser)
router.post("/", userControllers.createUser)
router.put("/:id",authMiddleware, userControllers.updateUser)
router.delete("/:id",authMiddleware, userControllers.deleteUser)
router.post("/:userId/follow", authMiddleware, userControllers.followUser);
router.post("/:userId/unfollow", authMiddleware, userControllers.unfollowUser);
router.get("/liked", authMiddleware, bookControllers.getLikedBooks);


module.exports = router