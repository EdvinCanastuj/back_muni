import { getConnection } from "./../db/database";

const getRol = async (req, res) => {
try {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM rol;");
    res.json(result);
} catch (error) {
    res.status(500).send(error.message);
}
};
export const methods={
    getRol
};
