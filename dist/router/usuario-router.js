"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_controller_1 = require("../controller/usuario-controller");
const auth_handler_1 = require("../security/auth.handler");
const authz_handler_1 = require("../security/authz.handler");
class UsuarioRouter {
    applyRoutes(app) {
        app.get('/users', [authz_handler_1.authorize('admin'), usuario_controller_1.usuarioController.findByEmail, usuario_controller_1.usuarioController.findAll]);
        app.get('/users/:id', [authz_handler_1.authorize('admin'), usuario_controller_1.usuarioController.validateId, usuario_controller_1.usuarioController.findById]);
        app.post('/users', [authz_handler_1.authorize('admin'), usuario_controller_1.usuarioController.save]);
        app.put('/users/:id', [authz_handler_1.authorize('admin'), usuario_controller_1.usuarioController.validateId, usuario_controller_1.usuarioController.replace]);
        app.patch('/users/:id', [authz_handler_1.authorize('admin'), usuario_controller_1.usuarioController.validateId, usuario_controller_1.usuarioController.update]);
        app.del('/users/:id', [authz_handler_1.authorize('admin'), usuario_controller_1.usuarioController.validateId, usuario_controller_1.usuarioController.delete]);
        app.post('users/authenticate', auth_handler_1.authenticate);
    }
}
exports.usuarioRouter = new UsuarioRouter();
