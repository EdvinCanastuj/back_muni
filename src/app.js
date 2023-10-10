import express from 'express';
import morgan from "morgan";
import usuarioRoutes from "./routes/usuario.routes";
import cargoRoutes from "./routes/cargo.routes";
import articuloRoutes from "./routes/articulos.routes";
import dependenciaRoutes from "./routes/dependencia.routes";
import rolRoutes from "./routes/rol.routes";
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
app.use("/cargos", cargoRoutes);
app.use("/articulos", articuloRoutes);
app.use("/dependencia", dependenciaRoutes);
app.use("/rol", rolRoutes);
export default app;