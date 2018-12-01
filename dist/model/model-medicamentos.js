"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const medicamentoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    dosagem: {
        type: String,
        required: true
    },
    dataFabricacao: {
        type: Date,
        required: true
    },
    dataValidade: {
        type: Date,
        required: true
    }
});
exports.Medicamento = mongoose.model('Medicamento', medicamentoSchema);
