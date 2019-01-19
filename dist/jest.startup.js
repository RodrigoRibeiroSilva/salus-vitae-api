"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jestCli = require("jest-cli");
const server_1 = require("./server/server");
const environment_1 = require("./common/environment");
const alerta_consumo_router_1 = require("./router/alerta-consumo-router");
const model_alerta_consumo_1 = require("./model/model-alerta-consumo");
let server;
const beforeAllTests = () => {
    environment_1.environment.db.url = process.env.DB_URL || 'mongodb://dbatest1:dbatest1@ds161134.mlab.com:61134/salus-vitae-test';
    environment_1.environment.server.port = process.env.SERVER_PORT || 3001;
    server = new server_1.Server();
    return server.initServer([alerta_consumo_router_1.alertaConsumoRouter])
        //Limpando a base de testes a cada execução
        .then(() => model_alerta_consumo_1.AlertaConsumo.remove({}).exec());
};
beforeAllTests()
    .then(() => jestCli.run())
    .then(() => afterAllTests())
    .catch(console.error);
const afterAllTests = () => {
    return server.disconnectServer();
};
