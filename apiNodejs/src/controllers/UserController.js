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
    },

    async buscarPeloId(req, res) {

        try {

            let idUrl = req.params.id;
            let user = await User.findByPk(idUrl);
    
            if(user) {
                res.status(200).json({
                    message: "Usuário encontrado com sucesso",
                    status: "S",
                    user
                })
            } else {
                res.status(404).json({
                    message: "Nenhum usuário encontrado",
                    status: "E"
                })
            }

        } catch (error) {
            
            res.status(500).json({
                message: error.message,
                status: "E"
            })
        }

    },

    async atualizarUsuario(req, res) {
        try {
           
            let idUrl = req.params.id;
            let { nome, email, senha, nivel } = req.body;

            if(nome == "" || email == "" || senha == "" || nivel == "") {
                res.status(400).json({
                    message: "Favor preencher todos os campos",
                    status: "E"
                })
                return
            }

            let novosDados = {
                nome: nome.toLowerCase(),
                email: email.toLowerCase(),
                senha: await bcrypt.hash(senha, 10),
                nivel: nivel.toUpperCase()
            }

            await User.update(novosDados, {
                where: {
                    id: idUrl
                }
            })

            res.status(200).json({
                message: "Usuário atualizado com sucesso",
                status: "S",
                usuarioAtualizado: {
                    id: idUrl,
                    nome: novosDados.nome,
                    email: novosDados.email,
                    senha: novosDados.senha,
                    nivel: novosDados.nivel
                }
            })

            
        } catch (error) {
            
            res.status(500).json({
                message: error.message,
                status: "E"
            })
        }
    },

    async deletarUsuario(req, res) {
        try {

            let idUrl = req.params.id;

            await User.destroy({
                where:{
                    id: idUrl
                }
            })

            res.status(200).json({
                message: "Usuário apagado com sucesso!",
                status: "S"
            })
            
        } catch (error) {
            res.status(500).json({
                message: error.message,
                status: "E"
            })
        }
    },

    async verificarLogin(req, res) {
        try {
            
            let{ username, senha } = req.body;

            if(username == "" || senha == "") {
                res.status(400).json({
                    message: "Favor Preencher login e senha",
                    status: "E"
                })
                return
            }

            let dbUser = await User.findOne({
                where: {
                    nome: {
                        [Op.eq]: username.toLowerCase()
                    }
                }
            })

            if(dbUser) {
                const combinaSenha = await bcrypt.compare(senha, dbUser.senha);

                if(combinaSenha) {
                    res.status(200).json({
                        message: "Usuário autenticado com sucesso",
                        status: "S",
                        username: dbUser.nome
                    })
                } else {
                    res.status(400).json({
                        message: "Username / senha inválido",
                        status: "E"
                    })
                }
            } else {
                res.status(400).json({
                    message: "Username / senha inválido",
                    status: "E"
                })
            }

        } catch (error) {
           res.status(500).json({
            message: error.message,
            status: "E"
           }) 
        }
    }
}

module.exports = UserController;