"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const prontuariosSchema = new mongoose.Schema({
    idPaciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true
    },
    prescricoes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Prescricao',
        required: false,
        default: []
    }
});
exports.Prontuario = mongoose.model('Prontuario', prontuariosSchema);
