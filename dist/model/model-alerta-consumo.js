"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const alertaSchema = new mongoose.Schema({
    cdPreOperacaoAprazamento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PreOperacaoAprazamento',
        required: true
    },
    dtEnvio: {
        type: Date,
        required: true
    }
});
exports.AlertaConsumo = mongoose.model('AlertaConsumo', alertaSchema);
