import mongoose, { mongo} from "mongoose"; 

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI,)
		console.log(`La conexion a la base de datos fue exitosa ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error al conectar a la base de datos ${error.message}`);
		process.exit(1);
	}
}

export default connectDB;