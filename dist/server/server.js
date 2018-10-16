"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const mongoose = require("mongoose");
const cors = require("cors");
const admin = require("firebase-admin");
const environment_1 = require("../common/environment");
const merge_patch_parser_1 = require("./merge-patch.parser");
const error_handler_1 = require("./error.handler");
const aprazamento_controller_1 = require("../controller/aprazamento-controller");
class Server {
    initServer(routers = []) {
        return this.initDb().then(() => this.initRoutes(routers).then(() => this.initFCM()).then(() => this));
    }
    initDb() {
        mongoose.Promise = global.Promise;
        return mongoose.connect(environment_1.environment.db.url, {
            useMongoClient: true
        });
    }
    initFCM() {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: 'push-notification-salus-vitae',
                clientEmail: 'firebase-adminsdk-czu6v@push-notification-salus-vitae.iam.gserviceaccount.com',
                privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCXsad5FJrLN4sh\nHpjvMDGDcLXS9KEAj9ORLPkjuYWMY4vUMgWDqJwj5HBGZn4UYqAbuMh/M9rp+1X2\nGUGujKZNJHR4tVbaeJdCF+WTNgeKalVL1/ZdaaepaBE3xqx43545ywUt2f+I8BCZ\nFKtNg8zL9VzAUFgqBC+TYeaXNGUYYTbEK3E3CXd+xLUZirN9YXhWoerv/mYuSU6C\nx31kYQnSx9ozHiODOV621j04hvv3DBXczVLDelzQSxr8B0UTqARp4Jvska+P5vdc\nwzT7xehcygYXPiG+9trsibi97uX52rJdxRYZXwD3JRdlV1eA/zjuYt7WwRkuh61p\nsIwE1eLjAgMBAAECggEACaCxZ+pqXq6CSpJWE4xEADsllyOGmnIGdAbeMynBs6TX\nyZp5Jh+L9W04wQcdRm7yCYBjXUttv/7/ODTnKcxse6XuLIEZ55jSxNOecwbxWJQi\nIMOus8QSa5qaySb3aF6M/M8JX50f7lGKRCT/MFbGp0VF40DWL6h/WoPSrlMZfYAI\n+qsnzukbpQNz8BGrUe0yeU7BRMx5XcnJbuvYso5beu9T4Sxip99P92gFJ075VSx6\nXmnyIvyJ+FSedygpXKg5hlawy/NGQbe3XbtyPlIilMFWwuwQix68OY4EQm175ROm\nt/Yfr8TYaBwqW6juNXMMnDJsjzRE6p9M2EGt5mCmCQKBgQDQ42znGercpAod/b1w\nlyot/t690Te43xgQTfW0H4zPrRVJlJsp0uPCFBZC5W5Lymtnimf07p5BsC3nevnA\nLKReragQ4sH4/8g7j7VqNd70JhoJw8w1SxensenKTM/w55OhTYM6eoL5xqf5i+da\nyK/69eMF7dZ2gmcOPQ6I0scTGwKBgQC55/+YS8bGi2Pn6r5APzXRxjE/Drp7EmAo\nd8Ofk9m7ts2/s6Llu2oltzb5Gq6LLRnU01CvG2FqvjhLPmvt6Sm7rCTm00cBzaMF\ncZu35I8586s+3yoxritfZq08m8m6KxPnY9ii2eFHidFvt1LC0AzkWEM9WEN4Ln++\nMKHBtQ4j2QKBgQDQN0IggjcXw/PJvVmN10BWJM2GS/vNLaPg7LTT3PcRM6gadiTM\nZchddoRSHjv5FEZHKTFCdnANbj3zlSNKKbWWImd6nW1YdC31IORmgFhC6Y/e1+q/\n3KAxqiguXK6RpWQEzyzVp7TSoPBi0M/GMHEqKNso19CExKtRCA9q1x9UrQKBgFbX\nbugfja01c+fkGhc879EcOejw4l+XR9/fgjxK/ozXaelA6rlSANW5bi6TLjHJUaW/\nSJNjwO/yB63ubNBn+Jy4X0yMKUFIY/ypA0q1s8oobzghWz5108Du38HOLD+Q2+1d\nENeR29BlKrZ69mgWc88/A7nmPy4m2nlnkkhAYWiRAoGAY2M5DaWAhvhOe2PJTcq5\nBRX15xmD6LIWMKJPekkwwQZeaouXK6NFlip8rRdZx6DHBG35B2Yjr6XQen3lHKZE\nnszMSiBhuAzgI5lrqIR7ltdnuAMBO+KdzTuh0uFcMUf4UjMWKx7EC1vxB3MQNOcj\nfwhykabD3ftwQ4gJgsDxMTs=\n-----END PRIVATE KEY-----\n'
            }),
            databaseURL: 'https://push-notification-salus-vitae.firebaseio.com'
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
                // This registration token comes from the client FCM SDKs.
                var topic = 'highScores';
                // See documentation on defining a message payload.
                var message = {
                    data: {
                        score: '850',
                        time: '2:45'
                    },
                    topic: topic
                };
                aprazamento_controller_1.setAprazamento(function (timeout) {
                    count++;
                    // Send a message in the dry run mode.
                    var dryRun = true;
                    admin.messaging().send(message, dryRun)
                        .then((response) => {
                        // Response is a message ID string.
                        console.log('Mensagem enviada com suceeso:', response);
                    })
                        .catch((error) => {
                        console.log('Erro durante o envio da mensagem:', error);
                    });
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
