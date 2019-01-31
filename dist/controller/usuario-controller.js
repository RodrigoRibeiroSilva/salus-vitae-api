"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
const model_usuario_1 = require("../model/model-usuario");
class UsuarioController extends controller_1.Controller {
    constructor() {
        super(model_usuario_1.User);
        this.findByEmail = (req, resp, next) => {
            if (req.query.email) {
                model_usuario_1.User.findByEmail(req.query.email)
                    .then(user => user ? [user] : [])
                    .then(this.renderAll(resp, next, {
                    pageSize: this.pageSize,
                    url: req.url
                }))
                    .catch(next);
            }
            else {
                next();
            }
        };
        this.on('beforeRender', document => {
            document.password = undefined;
            //delete document.password
        });
    }
}
exports.usuarioController = new UsuarioController();
