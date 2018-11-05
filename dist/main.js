"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const usuarios_router_1 = require("./router/usuarios.router");
const pacientes_router_1 = require("./router/pacientes.router");
const medicamentos_router_1 = require("./router/medicamentos.router");
const aprazamentos_router_1 = require("./router/aprazamentos.router");
const prescricoes_router_1 = require("./router/prescricoes.router");
const prontuarios_router_1 = require("./router/prontuarios.router");
const alerta_consumo_router_1 = require("./router/alerta-consumo-router");
const op_consumo_rodelagem_router_1 = require("./router/op-consumo-rodelagem-router");
const preop_aprazamento_router_1 = require("./router/preop-aprazamento-router");
const server = new server_1.Server();
server.initServer([usuarios_router_1.usersRouter,
    pacientes_router_1.pacientesRouter,
    medicamentos_router_1.medicamentosRouter,
    aprazamentos_router_1.aprazamentosRouter,
    prescricoes_router_1.prescricoesRouter,
    prontuarios_router_1.prontuariosRouter,
    alerta_consumo_router_1.alertaConsumoRouter,
    op_consumo_rodelagem_router_1.opConsumoRodelagemRouter,
    preop_aprazamento_router_1.preOperacaoAprazamentoRouter])
    .then(server => {
    console.log('Server is listening on:', server.app.address());
}).catch(error => {
    console.log('Server failed to start');
    console.error(error);
    process.exit(1);
});
