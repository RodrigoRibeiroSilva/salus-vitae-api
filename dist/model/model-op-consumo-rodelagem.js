"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const opConsumoRodelagemSchema = new mongoose.Schema({
    cdPreOperacaoAprazamento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PreOperacaoAprazamento',
        required: true
    },
    isConsumido: {
        type: Boolean,
        required: true
    },
    dtOperacao: {
        type: Date,
        required: true
    },
    justificativa: {
        type: String,
        required: false,
    },
});
exports.OpConsumoRodelagem = mongoose.model('OpConsumoRodelagem', opConsumoRodelagemSchema);
