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

    // Calculamos el valor total en la consulta SQL
    const sql = `INSERT INTO articulos 
                (id_usuario, codigo, nombre_articulo, no_serie, valor_unitario, valor_total, valor_baja, observaciones, qr, cantidad) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const result = await connection.query(sql, [
        id_usuario,
        codigo,
        nombre_articulo,
        no_serie,
        valor_unitario,
        valor_unitario*cantidad, // Valor unitario se repite para el cálculo
        valor_baja,
        observaciones,
        qr,
        cantidad
        ]);
    res.json({ message: "Articulo Added" });
} catch (error) {
    res.status(500).send(error.message);
}
};
