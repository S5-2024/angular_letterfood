import { db } from "../db.js";

// Função para obter todas as notas
export const getUser = async (_, res) => {
  try {
    const result = await db`SELECT * FROM users`;
    console.log(result)
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err.message);
    
  }
};

// Função para adicionar uma nova nota
export const addUser = async (req, res) => {
  const { nome, email,senha } = req.body;
  try {
    await db`
      INSERT INTO users (nome,email,senha) 
      VALUES (${nome}, ${email},${senha})
    `;
    return res.status(200).json("Usuário criado!");
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

// Função para atualizar uma nota existente
export const updatePassword = async (req, res) => {
  const {  senha } = req.body;
  const { email } = req.params;
  try {
    await db`
      UPDATE users
      SET senha = ${senha}
      WHERE email = ${email}
    `;
    return res.status(200).json("usuário atualizado!");
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

// Função para deletar uma nota
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await db`DELETE FROM users WHERE id = ${id}`;
    return res.status(200).json("Usuário deletado!");
  } catch (err) {
    return res.status(500).json(err.message);
  }

export const login = async(red,res) => {
  const { email, senha } = req.body;
  try {
    const user = await db`SELECT * FROM users WHERE email = ${email} AND senha = ${senha}`;
    if (user) {
      return res.status(200).json(user);
      } else { return res.status(401).json("usuário não encontrado"); }
} catch (err) { return res.status(500).json(err.message); }

}
  
};
