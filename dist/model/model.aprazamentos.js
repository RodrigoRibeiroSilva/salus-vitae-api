"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const aprazamentoSchema = new mongoose.Schema({
    paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
        required: false,
    },
    horario: {
        type: Date,
        required: true,
    },
    enfermeira: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    medicamento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicamento',
        required: true
    },
    isConsumido: {
        type: Boolean,
        required: false
    },
    intervalo: {
        type: String,
        required: true
    },
    isCancelado: {
        type: Boolean,
        required: false
    },
    justificativa: {
        type: String,
        required: false
    }
});
exports.Aprazamento = mongoose.model('Aprazamento', aprazamentoSchema);
