import express from "express";
import {
	authUser, 
	registerUser,
	logoutUser,
	getUserProfile,
	updateUserProfile} from "../controllers/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router()

router.post('/login', authUser);
router.post('/registerUser', registerUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile); 	

export default router;