"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generic_router_1 = require("./generic.router");
const model_usuario_1 = require("../model/model.usuario");
class UsersRouter extends generic_router_1.GenericRouter {
    constructor() {
        super(model_usuario_1.User);
        this.on('beforeRender', document => {
            document.password = undefined;
        });
    }
    applyRoutes(app) {
        app.get('/users', this.findAll);
        app.get('/users/:id', [this.validateId, this.findById]);
        app.post('/users', this.save);
        app.put('/users/:id', [this.validateId, this.replace]);
        app.patch('/users/:id', [this.validateId, this.update]);
        app.del('/users/:id', [this.validateId, this.delete]);
    }
}
exports.usersRouter = new UsersRouter();
