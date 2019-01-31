"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const restify_errors_1 = require("restify-errors");
const model_usuario_1 = require("../model/model-usuario");
const environment_1 = require("../common/environment");
exports.authenticate = (req, resp, next) => {
    const { email, password } = req.body;
    model_usuario_1.User.findByEmail(email, '+password') //1st
        .then(user => {
        if (user && user.matches(password)) { //2nd
            //gerar o token
            //3rd
            const token = jwt.sign({ sub: user.email, iss: environment_1.environment.security.apiSecret }, environment_1.environment.security.apiSecret);
            resp.json({ name: user.name, email: user.email, accessToken: token });
            return next(false);
        }
        else {
            return next(new restify_errors_1.NotAuthorizedError('Invalid Credentials'));
        }
    }).catch(next);
};
