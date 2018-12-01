"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const pacienteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    nomeSocial: {
        type: String,
        required: false
    },
    sexo: {
        type: String,
        required: true
    },
    dataNascimento: {
        type: Date,
        required: true
    },
    numeroRg: {
        type: String,
        required: true
    },
    numeroCpf: {
        type: String,
        required: true
    },
    nomeMae: {
        type: String,
        required: true
    },
    nomePai: {
        type: String,
        required: true
    },
    alergias: [{
            descricao: String
        }]
});
exports.Paciente = mongoose.model('Paciente', pacienteSchema);
