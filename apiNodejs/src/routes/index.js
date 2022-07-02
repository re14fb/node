const routes = require('express').Router();
const UserController = require('../controllers/UserController');

routes.get('/users', UserController.buscarTodosUsuarios);
routes.get('/users/:id', UserController.buscarPeloId);
routes.post('/users', UserController.criarUsuario);
routes.put('/users/:id', UserController.atualizarUsuario);
routes.delete('/users/:id', UserController.deletarUsuario);

routes.post('/verificarlogin', UserController.verificarLogin);

module.exports = routes;