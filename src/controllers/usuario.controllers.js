import {getConnection} from "./../db/database";
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
const getUsuario= async (req, res)=> {
    try{
        console.log(req.params);
        const {id_usuario} = req.params;
        const connection= await getConnection();
        const result = await connection.query("SELECT * FROM usuario WHERE Id_usuario = ?;",id_usuario);      
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};
const addUsuario = async (req, res)=> {
    try{
        //cambiarlo por los campos de la tabla
        const { id_usuario, nombre_usuario, nombre, apellido, contraseña, avarage } = req.body;
        if(id == undefined || name==undefined || lastname==undefined || brithdate==undefined || career==undefined || avarage==undefined){
            res.status(400).json({message:"Bad Request. Please fill all field."});
        }
        const students = { id, name, lastname, brithdate, career, avarage };
        const connection= await getConnection();
        const result = await connection.query("INSERT INTO usuario SET ?",students);
        res.json({message: "Usuario Added"});
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};
const deleteUsuario= async (req, res)=> {
    try{
        console.log(req.params);
        const {id} = req.params;
        const connection= await getConnection();
        const result = await connection.query("DELETE FROM usuario WHERE Id_usuario = ?;",id);    
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};
const updateUsuario= async (req, res)=> {
    try{
        //cambiarlo por los campos de la tabla
        const {id} = req.params;
        const { name, lastname, brithdate, career, avarage } = req.body;
        if(id == undefined || name==undefined || lastname==undefined || brithdate==undefined || career==undefined || avarage==undefined){
            res.status(400).json({message:"Bad Request. Please fill all field."});
        }
        const student = { id, name, lastname, brithdate, career, avarage };
        const connection= await getConnection();
        const result = await connection.query("UPDATE student SET ? WHERE id = ?;",[student, id]);    
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

