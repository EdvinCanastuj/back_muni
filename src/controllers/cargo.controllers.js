import { getConnection } from "./../db/database";

const getCargos = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("SELECT c.id_cargo, c.nombre_cargo, d.nombre_dependencia FROM cargo c INNER JOIN dependencia d ON c.id_dependencia = d.id_dependencia;");
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getCargosByDependencia = async (req, res) => {
  try {
    const { dependenciaId } = req.query; // Usamos req.query para obtener el parámetro de consulta dependenciaId
    const connection = await getConnection();
    const sql = "SELECT c.id_cargo, c.nombre_cargo FROM cargo c WHERE c.id_dependencia = ?;";
    const result = await connection.query(sql, [dependenciaId]);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getCargo = async (req, res) => {
  try {
    console.log(req.params);
    const { id_cargo } = req.params;
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM cargo WHERE id_cargo = ?;", [id_cargo]);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addCargo = async (req, res) => {
  try {
    const {  nombre_cargo, id_dependencia } = req.body;
    if ( !nombre_cargo || !id_dependencia) {
      res.status(400).json({ message: "Bad Request. Please fill all fields." });
      return;
    }
    const cargo = { nombre_cargo, id_dependencia };
    const connection = await getConnection();
    const result = await connection.query("INSERT INTO cargo SET ?", cargo);
    res.json({ message: "Cargo Added" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteCargo = async (req, res) => {
  try {
    const { id_cargo } = req.params;
    const connection = await getConnection();
    const result = await connection.query("DELETE FROM cargo WHERE id_cargo = ?;", [id_cargo]);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateCargo = async (req, res) => {
  try {
    const { id_cargo } = req.params;
    const { nombre_cargo } = req.body;

    if (!id_cargo || !nombre_cargo ) {
      return res.status(400).json({ message: "Bad Request. Please fill all fields." });
      
    }
    const cargo = { nombre_cargo };
    const connection = await getConnection();
    const result = await connection.query("UPDATE cargo SET ? WHERE id_cargo = ?;", [cargo, id_cargo]);
    res.json("updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const methods = {
  getCargos,
  getCargosByDependencia,
  getCargo,
  addCargo,
  updateCargo,
  deleteCargo,
  
};
