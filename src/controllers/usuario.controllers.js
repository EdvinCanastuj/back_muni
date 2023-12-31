import {getConnection} from "./../db/database";
//api para consultar todos los usuarios
const getUsuarios= async (req, res)=> {
    try{
        const connection= await getConnection();
        const result = await connection.query("SELECT u.id_usuario, u.nombre_usuario, u.nombre, u.apellido, u.codigo, r.tipo_rol, d.nombre_dependencia, c.nombre_cargo FROM usuario u INNER JOIN rol r ON u.id_rol = r.id_rol INNER JOIN cargo c ON u.id_cargo = c.id_cargo INNER JOIN dependencia d ON c.id_dependencia = d.id_dependencia;");      
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};


const getUsuarios1= async (req, res)=> {
    try{
        const connection= await getConnection();
        const result = await connection.query("SELECT * from usuario;");      
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};
const getResponsable= async (req, res)=> {
    try{
        const connection= await getConnection();
        const result = await connection.query("SELECT id_usuario, nombre, apellido, codigo FROM usuario");      
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
        const { nombre_usuario, nombre, apellido, contrasena, codigo, id_rol, id_cargo} = req.body;
        if( nombre_usuario==undefined || nombre==undefined || apellido==undefined || contrasena==undefined || codigo==undefined || id_rol==undefined || id_cargo==undefined){
            res.status(400).json({message:"Bad Request. Please fill all field."});
        }
        const usuario = {  nombre_usuario, nombre, apellido, contrasena, codigo, id_rol, id_cargo};
        //INSERT INTO `usuario` (`id_usuario`, `nombre_usuario`, `nombre`, `apellido`, `contrasena`, `codigo`, `id_rol`, `id_cargo`
        const connection= await getConnection();
        const result = await connection.query("INSERT INTO usuario SET ?",usuario);
        //res.json(result);
        res.json({message: "Usuario Added"});
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

//api para eliminar un usuario
const deleteUsuario= async (req, res)=> {
    try{
        const {id_usuario} = req.params;
        const connection= await getConnection();
        const result = await connection.query("DELETE FROM usuario WHERE id_usuario = ?;",id_usuario);    
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
        const { nombre_usuario, nombre, apellido, contrasena, codigo, id_rol, id_cargo} = req.body;
        if(id_usuario == undefined || nombre_usuario==undefined || nombre==undefined || apellido==undefined || contrasena==undefined || codigo==undefined || id_rol==undefined || id_cargo==undefined ){
            res.status(400).json({message:"Bad Request. Please fill all field."});
        }
        const usuario = { nombre_usuario, nombre, apellido, contrasena, codigo, id_rol, id_cargo};
        const connection= await getConnection();
        const result = await connection.query("UPDATE usuario SET ? WHERE id_usuario = ?;",[usuario, id_usuario]);    
        //res.json(result);
        res.json({message: "Usuario Updated"});
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};
const loginUsuario = async (req, res) => {
try {
    const { nombre_usuario, contrasena } = req.body;
    const connection = await getConnection();
    const result = await connection.query('SELECT * FROM usuario WHERE nombre_usuario = ? AND contrasena = ?', [nombre_usuario, contrasena]);

    if (result.length > 0) {
        const usuario = result[0];
        res.json({ message: "Acceso permitido", rol: usuario.id_rol, nombre: usuario.nombre, apellido: usuario.apellido, id_usuario: usuario.id_usuario});
    } else {
        res.status(401).json({ message: "Acceso denegado" });
    }
} catch (error) {
    res.status(500);
    res.send(error.message);
    }
};
export const methods={
    getUsuarios,
    getUsuarios1,
    getUsuario,
    addUsuario,
    updateUsuario,
    deleteUsuario,
    loginUsuario,
    getResponsable
};

