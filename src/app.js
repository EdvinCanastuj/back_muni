import express from 'express';
import morgan from "morgan";
import usuarioRoutes from "./routes/usuario.routes";
const app = express();
const cors = require('cors');
// Settings
app.set("port", 4000);
// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Routes
app.use("/usuarios", usuarioRoutes);

export default app;