"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const preOperacaoAprazamentoSchema = new mongoose.Schema({
    //Dados do Aprazamento
    status: {
        type: String,
        required: false,
    },
    cdProntuario: {
        type: Number,
        required: true
    },
    cdAtendimento: {
        type: Number,
        required: true
    },
    cdPrescricao: {
        type: Number,
        required: true
    },
    dtPreOpAprazamento: {
        type: Date,
        required: true
    },
    horarioInicial: {
        type: Date,
        required: true
    },
    intervalo: {
        type: Date,
        required: true
    },
    //Dados do medicamento que foi aprazado
    cdItem: {
        type: Number,
        required: true
    },
    cdTpItem: {
        type: Number,
        required: true
    },
    ordemItem: {
        type: Number,
        required: true
    },
    quantidade: {
        type: Number,
        required: true
    }
});
exports.PreOperacaoAprazamento = mongoose.model('PreOperacaoAprazamento', preOperacaoAprazamentoSchema);
