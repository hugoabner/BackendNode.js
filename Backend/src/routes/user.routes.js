import express from "express";
import {authUser, 
		registerUser,
		logoutUser,
		getUserProfile,
		updateUserProfile
		 } from "../controllers/user.controller.js";


const router = express.Router()

router.post('/login', authUser);
router.post('/registerUser', registerUser);
router.post('/logout', logoutUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile); 	

export default router;