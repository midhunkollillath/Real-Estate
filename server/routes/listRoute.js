import express from "express";
import { createList,deleteList,updateListing,getListing,getSearchListing } from "../controllers/listController.js";
import { verify } from "../utils/verify.js";


const router = express.Router()
router.post('/create-list',verify,createList);
router.delete('/delete/:id',verify,deleteList);
router.post('/update/:id',verify,updateListing);
router.get('/get/:id',getListing);
router.get('/get',getSearchListing);
export default router