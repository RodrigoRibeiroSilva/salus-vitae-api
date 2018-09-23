"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const prescricaoSchema = new mongoose.Schema({
    dataPrescricao: {
        type: Date,
        required: false
    },
    medicoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    medicamentos: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Medicamento',
            required: false,
            default: []
        }]
});
exports.Prescricao = mongoose.model('Prescricao', prescricaoSchema);
