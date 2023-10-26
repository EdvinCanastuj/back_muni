import { getConnection } from "../db/database";

const getDependencias = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM dependencia;");
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getDependencia = async (req, res) => {
  try {
    console.log(req.params);
    const { id_dependencia } = req.params;
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM dependencia WHERE id_dependencia = ?;", [id_dependencia]);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addDependencia = async (req, res) => {
  try {
    const {  nombre_dependencia } = req.body;
    if ( !nombre_dependencia) {
      res.status(400).json({ message: "Bad Request. Please fill all fields." });
      return;
    }
    const dependencia = { nombre_dependencia };
    const connection = await getConnection();
    const result = await connection.query("INSERT INTO dependencia SET ?", dependencia);
    res.json({ message: "Cargo Added" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteDependencia= async (req, res) => {
  try {
    const { id_dependencia } = req.params;
    const connection = await getConnection();
    const result = await connection.query("DELETE FROM dependencia WHERE id_dependencia = ?;", [id_dependencia]);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateDependencia= async (req, res) => {
  try {
    const { id_dependencia } = req.params;
    const { nombre_dependencia } = req.body;
    if (!id_dependencia || !nombre_dependencia) {
      res.status(400).json({ message: "Bad Request. Please fill all fields." });
      return;
    }
    
    const connection = await getConnection();
    const result = await connection.query("UPDATE dependencia SET nombre_dependencia = ? WHERE id_dependencia = ?;", [nombre_dependencia, id_dependencia]);
    
    if (result.affectedRows > 0) {
      res.json("Updated dependencia");
    } else {
      res.status(404).json({ message: "Dependencia not found." });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const methods = {
  getDependencias,
  getDependencia,
  addDependencia,
  updateDependencia,
  deleteDependencia
};
