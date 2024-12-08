import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/user.routes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from  "./config/dbConection.js";


dotenv.config();
connectDB();

const port = process.env.PORT || 2020;

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors({
	origin: '*',
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']}));

app.get('/', (req, res) =>
	 res.send('Servidor funcionando'));

/**@Routes de usuarios **/
app.use('/users', router);

/**@Middleware para manejar rutas no encontradas **/
app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>
	 console.log(`Servidor corriendo en el puerto ${port}`));



