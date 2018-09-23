"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const prontuariosSchema = new mongoose.Schema({
    idPaciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true
    },
    prescricoes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Prescricao',
            required: false,
            default: []
        }],
    ala: {
        type: String,
        required: true
    },
    dataAdmissao: {
        type: Date,
        required: true
    },
    pesoAdmissao: {
        type: String,
        required: true
    },
    dataAlta: {
        type: Date,
        required: false
    },
    leito: {
        type: String,
        required: true
    },
});
exports.Prontuario = mongoose.model('Prontuario', prontuariosSchema);
