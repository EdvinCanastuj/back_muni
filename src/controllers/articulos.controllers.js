import { getConnection } from "./../db/database";

const getArticulos = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM articulos;");
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getArticulo = async (req, res) => {
  try {
    const { id_articulo } = req.params;
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM articulos WHERE id_articulo = ?;", [id_articulo]);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addArticulo = async (req, res) => {
  //INSERT INTO `articulos` 
  //(`id_articulo`, `id_usuario`, `codigo`, `nombre_articulo`, `no_serie`, `valor_unitario`, `valor_total`, `valor_baja`, `observaciones`, `qr`, `cantidad`) 
  //VALUES (NULL, '1', '123', 'monitor', '123456', '15', '10', '12', 'as', '1', '2');
  try {
    const {
      id_usuario,
      codigo,
      nombre_articulo,
      no_serie,
      valor_unitario,
      valor_total,
      valor_baja,
      observaciones,
      qr,
      cantidad
    } = req.body;

    if (
      !id_usuario ||
      !codigo ||
      !nombre_articulo ||
      !no_serie ||
      !valor_unitario ||
      !valor_total ||
      !valor_baja ||
      !observaciones ||
      !qr ||
      !cantidad
    ) {
      res.status(400).json({ message: "Bad Request. Please fill all fields." });
      return;
    }

    const articulo = {
      id_usuario,
      codigo,
      nombre_articulo,
      no_serie,
      valor_unitario,
      valor_total,
      valor_baja,
      observaciones,
      qr,
      cantidad
    };

    const connection = await getConnection();
    const result = await connection.query("INSERT INTO articulos SET ?", articulo);
    res.json({ message: "Articulo Added" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteArticulo = async (req, res) => {
  try {
    const { id_articulo } = req.params;
    const connection = await getConnection();
    const result = await connection.query("DELETE FROM articulos WHERE id_articulo = ?;", [id_articulo]);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateArticulo = async (req, res) => {
  try {
    const { id_articulo } = req.params;
    const {
      id_usuario,
      codigo,
      nombre_articulo,
      no_serie,
      valor_unitario,
      valor_total,
      valor_baja,
      observaciones,
      qr,
      cantidad
    } = req.body;

    if (
      !id_articulo ||
      !id_usuario ||
      !codigo ||
      !nombre_articulo ||
      !no_serie ||
      !valor_unitario ||
      !valor_total ||
      !valor_baja ||
      !observaciones ||
      !qr ||
      !cantidad
    ) {
      res.status(400).json({ message: "Bad Request. Please fill all fields." });
      return;
    }

    const articulo = {
      id_usuario,
      codigo,
      nombre_articulo,
      no_serie,
      valor_unitario,
      valor_total,
      valor_baja,
      observaciones,
      qr,
      cantidad
    };

    const connection = await getConnection();
    const result = await connection.query("UPDATE articulos SET ? WHERE Id_articulo = ?;", [articulo, id_articulo]);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const methods = {
  getArticulos,
  getArticulo,
  addArticulo,
  updateArticulo,
  deleteArticulo
};