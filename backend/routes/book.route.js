import express from "express";
const router = express.Router();
import {createBook, deleteBook, getAllBooks, getSingleBook, updateBook} from "../controllers/book.controller.js"

router.get("/", getAllBooks)
router.get("/:id", getSingleBook )
router.post("/", createBook )
router.put("/:id", updateBook)
router.delete("/:id", deleteBook )

export default router;