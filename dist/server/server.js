"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const mongoose = require("mongoose");
const cors = require("cors");
const environment_1 = require("../common/environment");
const merge_patch_parser_1 = require("./merge-patch.parser");
const error_handler_1 = require("./error.handler");
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
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.Server = Server;
