import { getConnection } from "./../db/database";

const getArticulos = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("SELECT a.id_articulo, u.nombre, a.codigo, a.nombre_articulo, a.no_serie, a.valor_unitario, a.valor_total, a.valor_baja, a.observaciones, a.qr, a.cantidad FROM articulos a INNER JOIN usuario u ON a.id_usuario = u.id_usuario;");
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
  try {
    const {
      id_usuario,
      codigo,
      nombre_articulo,
      no_serie,
      valor_unitario,
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
      !valor_baja ||
      !observaciones ||
      !qr ||
      !cantidad
    ) {
      res.status(400).json({ message: "Bad Request. Please fill all fields." });
      return;
    }

    const connection = await getConnection();

    // Convertimos QR 
    const imageBlob = Buffer.from(qr.split(',')[1], 'base64');
    // Calculamos el valor total en la consulta SQL
    const sql = `INSERT INTO articulos (id_usuario, codigo, nombre_articulo, no_serie, valor_unitario, valor_total, valor_baja, observaciones, qr, cantidad) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const result = await connection.query(sql, [
      id_usuario,
      codigo,
      nombre_articulo,
      no_serie,
      valor_unitario,
      valor_unitario * cantidad,
      valor_baja,
      observaciones,
      imageBlob, // Aquí almacenamos la imagen binaria
      cantidad
    ]);
    res.json({ message: "Articulo Added" });
  } catch (error) {
    console.error("Error al insertar artículo:", error);
    res.status(500).json({ error: "Error interno del servidor" });
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
    const result = await connection.query("UPDATE articulos SET ? WHERE id_articulo = ?;", [articulo, id_articulo]);
    res.json("updated articulo");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const getUsuarios= async (req, res)=> {
  try{
      const connection= await getConnection();
      const result = await connection.query("SELECT * FROM usuario");      
      res.json(result);
  }catch(error){
      res.status(500);
      res.send(error.message);
  }
};

export const methods = {
  getArticulos,
  getArticulo,
  addArticulo,
  updateArticulo,
  deleteArticulo,
  getUsuarios
};