"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const mongoose = require("mongoose");
const cors = require("cors");
const environment_1 = require("../common/environment");
const merge_patch_parser_1 = require("./merge-patch.parser");
const error_handler_1 = require("./error.handler");
const consumo_controller_1 = require("../controller/consumo.controller");
class Server {
    initServer(routers = []) {
        return this.initDb().then(() => this.initRoutes(routers).then(() => this));
    }
    initDb() {
        mongoose.Promise = global.Promise;
        return mongoose.connect(environment_1.environment.db.url, {
            useMongoClient: true
        });
    }
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                this.app = restify.createServer({
                    name: 'salus-vitae-api',
                    version: '1.0.0'
                });
                this.app.use(restify.plugins.queryParser());
                this.app.use(restify.plugins.bodyParser());
                this.app.use(merge_patch_parser_1.mergePatchBodyParser);
                this.app.use(cors());
                //routes
                for (let router of routers) {
                    router.applyRoutes(this.app);
                }
                this.app.listen(environment_1.environment.server.port, () => {
                    resolve(this.app);
                });
                this.app.on('restifyError', error_handler_1.handleError);
                //Exemplo do aprazamento de 4 medicações agendadas a cada 10 segundos (Iniciando e abortando a rotina) 
                var count = 0;
                consumo_controller_1.setAprazamento(function (timeout) {
                    count++;
                    console.log(`Eu como enfermeira digo: -Hora de tomar o remedinho -- ${count} vez(es)`);
                    if (count == 4) {
                        console.log('Todos os remédios foram todamos. Rotina Cancelada.');
                        clearTimeout(timeout);
                    }
                }, ((0 * 60 + 3) * 60 + 30) * 1000, ((0 * 60 + 0.10) * 60 + 0) * 1000, ((0 * 60 + 0) * 60 + 30) * 1000);
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.Server = Server;
