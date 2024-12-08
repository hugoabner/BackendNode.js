import asyncHandler from 'express-async-handler';
import User from '../models/userModels.js';
import generateToken from '../utils/generateToken.js';

/**@Function para autenticar usuario **/
export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	console.log("esto es mi credential", email, password);
  
	const user = await User.findOne({ email });
	console.log("user", user);
  
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
	res.status(200).json({
		message: 'Logout user'
	})
});

/**@Funtion para obtener informacion del usuario **/
export const getUserProfile = asyncHandler(async(req, res)=> {
	res.status(200).json({
		message: 'desde la funcion get user profile'
	})
});

/**@Function para actualizar el perfil del usuario**/
export const updateUserProfile = asyncHandler(async(req, res) => {
	res.status(200).json({
		message: 'desde la funcion update user profile'
	})
});
