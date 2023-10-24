import { getConnection } from "./../db/database";

const getHistorial = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT h.id_historial, h.id_articulo, u.nombre_usuario, "+
        " h.codigo, h.nombre_articulo, h.no_serie, h.valor_unitario, h.valor_total, h.valor_baja, "+
        "h.cantidad, h.observaciones, h.fecha FROM historial h "+
        "INNER JOIN usuario u ON u.id_usuario = h.id_usuario");
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
    };
    const getHistoriaArticulo = async (req, res) => {
    try {
        const { id_articulo } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT h.id_historial, h.id_articulo, u.nombre_usuario,"+
        " h.codigo, h.nombre_articulo, h.no_serie, "+
        "h.valor_unitario, h.valor_total, h.valor_baja, h.cantidad, "+
        "h.observaciones ,h.fecha FROM historial h "+
        "INNER JOIN usuario u ON u.id_usuario = h.id_usuario "+
        "WHERE id_articulo = ?;", [id_articulo]);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
    };  
    
    export const methods = {
        getHistorial,
        getHistoriaArticulo
        
    };