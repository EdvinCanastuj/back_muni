import { getConnection } from "./../db/database";

    const getHistorial = async (req, res) => {
        try {
            const connection = await getConnection();
            const result = await connection.query("SELECT h.id_historial, h.id_articulo, u.nombre_usuario, "+
            " h.codigo, h.nombre_articulo, h.no_serie, h.valor_unitario, h.valor_total, h.valor_baja, "+
            "h.cantidad, h.observaciones, h.fecha FROM historial h "+
            "INNER JOIN usuario u ON u.id_usuario = h.id_usuario");
    
            // Formatear la fecha en cada objeto del resultado
            const formattedResult = result.map((row) => {
                return {
                    id_historial: row.id_historial,
                    id_articulo: row.id_articulo,
                    nombre_usuario: row.nombre_usuario,
                    codigo: row.codigo,
                    nombre_articulo: row.nombre_articulo,
                    no_serie: row.no_serie,
                    valor_unitario: row.valor_unitario,
                    valor_total: row.valor_total,
                    valor_baja: row.valor_baja,
                    cantidad: row.cantidad,
                    observaciones: row.observaciones,
                    fecha: new Date(row.fecha).toLocaleString() // Formatear la fecha
                };
            });
    
            res.json(formattedResult);
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