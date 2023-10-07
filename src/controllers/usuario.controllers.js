import {getConnection} from "./../db/database";
//api para consultar todos los usuarios
const getUsuarios= async (req, res)=> {
    try{
        const connection= await getConnection();
        const result = await connection.query("SELECT * FROM usuario;");      
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};
//api para consultar un usuario
const getUsuario= async (req, res)=> {
    try{
        console.log(req.params);
        const {id_usuario} = req.params;
        const connection= await getConnection();
        const result = await connection.query("SELECT * FROM usuario WHERE id_usuario = ?;",id_usuario);      
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};
//api para agregar un usuario
const addUsuario = async (req, res)=> {
    try{
        //cambiarlo por los campos de la tabla
        const { nombre_usuario, nombre, apellido, contrasena, codigo, id_rol, id_cargo, id_dependencia } = req.body;
        if( nombre_usuario==undefined || nombre==undefined || apellido==undefined || contrasena==undefined || codigo==undefined || id_rol==undefined || id_cargo==undefined || id_dependencia==undefined){
            res.status(400).json({message:"Bad Request. Please fill all field."});
        }
        const usuario = {  nombre_usuario, nombre, apellido, contrasena, codigo, id_rol, id_cargo, id_dependencia };
        //INSERT INTO `usuario` (`id_usuario`, `nombre_usuario`, `nombre`, `apellido`, `contrasena`, `codigo`, `id_rol`, `id_cargo`
        const connection= await getConnection();
        const result = await connection.query("INSERT INTO usuario SET ?",usuario);
        res.json(result);
        res.json({message: "Usuario Added"});
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};
//api para eliminar un usuario
const deleteUsuario= async (req, res)=> {
    try{
        console.log(req.params);
        const {id} = req.params;
        const connection= await getConnection();
        const result = await connection.query("DELETE FROM usuario WHERE id_usuario = ?;",id);    
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};
//api para actualizar un usuario
const updateUsuario= async (req, res)=> {
    try{
        //cambiarlo por los campos de la tabla
        const {id_usuario} = req.params;
        const { nombre_usuario, nombre, apellido, contrasena, codigo, id_rol, id_cargo, id_dependencia } = req.body;
        if(id_usuario == undefined || nombre_usuario==undefined || nombre==undefined || apellido==undefined || contrasena==undefined || codigo==undefined || id_rol==undefined || id_cargo==undefined || id_dependencia==undefined){
            res.status(400).json({message:"Bad Request. Please fill all field."});
        }
        const usuario = { nombre_usuario, nombre, apellido, contrasena, codigo, id_rol, id_cargo, id_dependencia };
        const connection= await getConnection();
        const result = await connection.query("UPDATE usuario SET ? WHERE id_usuario = ?;",[usuario, id_usuario]);    
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};
export const methods={
    getUsuarios,
    getUsuario,
    addUsuario,
    updateUsuario,
    deleteUsuario
};

