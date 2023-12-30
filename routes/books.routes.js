import { Router } from "express";
import {createBook, deleteBook, getAllBook, getBookByID, updateBook }from '../controller/books.controller.js'
const router = new Router();

router.post("/create" , createBook)
router.get("/get-books" , getAllBook)
router.get("/get-book/:id" , getBookByID)
router.put("/update-book/:id" , updateBook) ;
router.delete("/delete-book/:id" , deleteBook)
export default router ;