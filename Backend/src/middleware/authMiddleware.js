import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModels.js';

export const protect = asyncHandler(
	async (req, res, next) => {
	let token;
	token = req.cookies.jwt;
	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await User.findById(decoded.userId).select('-password');
			next();
		} catch (error) {
			res.status(401);
			throw new Error('No esta authonticado, token invalido');
		}
	} else {
		res.status(401);
		throw new Error('No esta authonticado, no hay token');
	}}
) 