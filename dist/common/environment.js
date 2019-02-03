"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    server: { port: process.env.PORT || 3000 },
    db: { url: 'mongodb://dbasalus1:dbasalus1@ds111063.mlab.com:11063/salus-vitae' },
    security: {
        saltRounds: process.env.saltRounds || 10,
        apiSecret: process.env.API_SECRET || 'salus-vitae-api-secret',
        enableHTTPS: process.env.ENABLE_HTTPS || false,
        certificate: process.env.CERTI_FILE || './security/keys/cert.pem',
        key: process.env.CERT_KEY_FILE || './security/keys/key.pem'
    },
    log: {
        level: process.env.LOF_LEVEL || 'debug',
        name: 'salus-vitae-api-logger'
    }
};
