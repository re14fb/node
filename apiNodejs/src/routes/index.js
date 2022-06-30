const routes = require('express').Router();
const UserController = require('../controllers/UserController');

routes.get('/users', UserController.buscarTodosUsuarios);

routes.post('/users', UserController.criarUsuario);

module.exports = routes;