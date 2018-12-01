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
        required: false
    },
    dataValidade: {
        type: Date,
        required: false
    }
});
exports.Medicamento = mongoose.model('Medicamento', medicamentoSchema);
