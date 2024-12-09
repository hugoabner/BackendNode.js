import asyncHandler from 'express-async-handler';
import User from '../models/userModels.js';
import generateToken from '../utils/generateToken.js';

/**@Function para autenticar usuario **/
export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user && (await user.matchPassword(password))) {
	  generateToken(res, user._id);
	  res.status(200).json({
		_id: user._id,
		name: user.name,
		email: user.email,
	  });
	} else {
	  res.status(401);
	  throw new Error('El email o contraseña son incorrectos');
	}
});

/**@Function para registrar usuario **/
export const registerUser = asyncHandler( async(req, res) => {
	const { name, email, password } = req.body; 
	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error('El usuario ya existe');
	}
	const user = await User.create({
		name, 
		email,
		password
	});
	console.log(user);
	if (user) {
		generateToken(res, user._id)
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email
		});
	} else {
		res.status(400);
		throw new Error('No se pudo crear el usuario');
	}
});

/**@Function para cerrar sesion del usuario **/
export const logoutUser = asyncHandler(async(req, res) => {
	res.cookie('jwt', '', {
		httpOnly: true,
		expires: new Date(0),
	})
	res.status(200).json({
		message:'Usuario desconectado'
	});
});

/**@Funtion para obtener informacion del usuario **/
export const getUserProfile = asyncHandler(async(req, res)=> {
	const user = {
		_id: req.user._id,
		name: req.user.name,
		email: req.user.email
	}
	res.status(200).json(user);
});

/**@Function para actualizar el perfil del usuario**/
export const updateUserProfile = asyncHandler(async(req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}
		const updateUser = await user.save();
		res.status(200).json({
			_id: updateUser._id,
			name: updateUser.name,
			email: updateUser.email
		})
	} else {
		res.status(404);
		throw new Error('Usuario no encontrado');
	} 
});
