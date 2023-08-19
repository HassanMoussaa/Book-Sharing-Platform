const express = require("express");
const router = express.Router()
const bookControllers = require("../controllers/book.controller");
const authMiddleware = require("../middlewares/auth.middleware")

router.get("/",authMiddleware, bookControllers.getAllPosts)
router.post("/:bookId/addcomment",authMiddleware, bookControllers.addComment)
router.post("/",authMiddleware, bookControllers.createBook)
router.get("/feed", authMiddleware, bookControllers.getFeed);
router.post("/:bookId/like", authMiddleware, bookControllers.likeBook);
router.post("/:bookId/unlike", authMiddleware, bookControllers.unlikeBook);
router.get("/liked", authMiddleware, bookControllers.getLikedBooks);
router.get("/recommended", authMiddleware, bookControllers.getRecommendedBooks);
router.get("/search", bookControllers.searchBooks);
router.get("/:id",authMiddleware, bookControllers.getPost)

module.exports = router