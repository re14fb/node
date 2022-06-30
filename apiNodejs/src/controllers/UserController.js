const User = require('../models/UserModels');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

const UserController = {
    async buscarTodosUsuarios(req, res) {
        try{

            let users = await User.findAll();

            res.status(200).json({
               message: "Usuários buscados com sucesso!",
               status: "S",
               users
            });

        } catch(error) {

            res.status(500).json({
                message: error.message,
                status: "E"
            });
        }
    },

    async criarUsuario(req, res) {
        try {

            let {nome, email, senha, nivel} = req.body;

            // Valida se todos os campos estão preenchidos
            if(nome == "" || email == "" || senha == "" || nivel == "") {
                res.status(400).json({
                    message: "Favor preencher todos os campos.",
                    status: "E"
                });
                return;
            }

            // Verifica se ja exite um usuario
            const existeUsuario = await User.findOne({
                where: {
                    nome: {
                        [Op.eq]: nome.toLowerCase()
                    }
                }
            });

            if(existeUsuario) {
                res.status(400).json({
                    message: "Usuário já existe.",
                    status: "E"
                });
                return;
            }

            // Criptografar a senha
            const senhaCriptografada = await bcrypt.hash(senha, 10);

            // Criar o usuario
            let user = await User.create({
                nome: nome.toLowerCase(),
                email: email.toLowerCase(),
                senha: senhaCriptografada,
                nivel: nivel.toUpperCase()
            });

            // Devolver a resposta de sucesso
            res.status(201).json({
                message: "Usuário criado com sucesso!",
                status: "S",
                user
            });

        } catch (error) {

            res.status(500).json({
                message: error.message,
                status: "E"
            });

        }
    }
}

module.exports = UserController;