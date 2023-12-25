import express from "express";
import { deleteUser, updateUser,allListing, getUser } from "../controllers/userController.js";
import { verify } from "../utils/verify.js";


const router = express.Router()
router.post('/update/:id', verify, updateUser)
router.delete('/delete/:id',verify,deleteUser)
router.get('/get-listing/:id',verify,allListing)
router.get('/:id',verify,getUser)
export default router