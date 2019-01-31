"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const alerta_consumo_router_1 = require("./router/alerta-consumo-router");
const op_consumo_rodelagem_router_1 = require("./router/op-consumo-rodelagem-router");
const preop_aprazamento_router_1 = require("./router/preop-aprazamento-router");
const usuario_router_1 = require("./router/usuario-router");
exports.server = new server_1.Server();
exports.server.initServer([alerta_consumo_router_1.alertaConsumoRouter,
    op_consumo_rodelagem_router_1.opConsumoRodelagemRouter,
    preop_aprazamento_router_1.preOperacaoAprazamentoRouter,
    usuario_router_1.usuarioRouter])
    .then(server => {
    console.log('Server is listening on:', server.app.address());
}).catch(error => {
    console.log('Server failed to start');
    console.error(error);
    process.exit(1);
});
