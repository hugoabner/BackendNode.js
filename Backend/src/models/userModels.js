import mongoose from "mongoose";
import bcrypt from "bcryptjs";
 

const userSchema = mongoose.Schema({
	name:{type: String, required: true},
	email:{type: String, required: true},
	password: {type: String, required: true},
}, { timestamps: true });

/**@Middleware para cifrar contraseñas **/
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}
	console.log("password", this.password);
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
  });
  
  /**@Middleware para comparar contraseñas **/
  userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
  };
  
  const User = mongoose.model('User', userSchema);

  export default User;