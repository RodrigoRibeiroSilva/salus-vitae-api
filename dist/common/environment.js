"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    server: { port: process.env.PORT || 3000 },
    db: { url: 'mongodb://dbasalus1:dbasalus1@ds111063.mlab.com:11063/salus-vitae' },
    security: { saltRounds: process.env.saltRounds || 10 }
};
