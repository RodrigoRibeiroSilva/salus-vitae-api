"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const main_1 = require("../main");
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
        type: Number,
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
//Middleware para Arzamenar e disparar o timeOut do aprazamento.
const saveMiddleware = function (next) {
    const preOperacaoAprazamento = this;
    if (preOperacaoAprazamento) {
        main_1.dictAprazamentos.set(preOperacaoAprazamento.cdItem.toString(), "consegui");
        next(console.log(main_1.dictAprazamentos.length));
    }
    else {
    }
};
preOperacaoAprazamentoSchema.pre('save', saveMiddleware);
exports.PreOperacaoAprazamento = mongoose.model('PreOperacaoAprazamento', preOperacaoAprazamentoSchema);
