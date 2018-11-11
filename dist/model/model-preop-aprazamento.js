"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const main_1 = require("../main");
const restify_errors_1 = require("restify-errors");
const aprazamento_controller_1 = require("../controller/aprazamento-controller");
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
//Middleware para Arzamenar e disparar a rotina do aprazamento.
const saveMiddleware = function (next) {
    const preOperacaoAprazamento = this;
    if (preOperacaoAprazamento) {
        main_1.server.aprazamentos.push(preOperacaoAprazamento._id, iniciaTimeOut(preOperacaoAprazamento));
        console.log(main_1.server.aprazamentos.length);
        next();
    }
    else {
        throw new restify_errors_1.NotFoundError('Erro ao inserir o aprazamento.');
    }
};
//Middleware para atualizar a rotina da notificação do aprazamento.
const updateMiddleware = function (next) {
    const preOperacaoAprazamento = this;
    main_1.server.aprazamentos.forEach(function (key, value) {
        if (key === preOperacaoAprazamento._id) {
            clearTimeout(value);
            this.value = iniciaTimeOut(preOperacaoAprazamento);
        }
    });
    next();
};
const iniciaTimeOut = function (preOperacaoAprazamento) {
    //Dados da pre-operação
    let horas = preOperacaoAprazamento.horarioInicial.getHours();
    let minutos = preOperacaoAprazamento.horarioInicial.getMinutes();
    let segundos = preOperacaoAprazamento.horarioInicial.getSeconds();
    let intervalo = preOperacaoAprazamento.intervalo;
    //Dados da rotina de notificação
    let horaInicialAprazamento = ((horas * 60 + minutos) * 60 + segundos) * 1000;
    let intervaloAprazamento = ((0 * 60 + intervalo) * 60 + 0) * 1000;
    let aprazamentoNotification = aprazamento_controller_1.setAprazamento(function (timeout) {
        //Lógica para o envio do push notification
        console.log("Aprazei");
        //console.log(server.aprazamentos.)
    }, horaInicialAprazamento, intervaloAprazamento, ((0 * 60 + 0) * 60 + 0) * 1000);
};
preOperacaoAprazamentoSchema.pre('save', saveMiddleware);
preOperacaoAprazamentoSchema.pre('findOneAndUpdate', updateMiddleware);
preOperacaoAprazamentoSchema.pre('update', updateMiddleware);
exports.PreOperacaoAprazamento = mongoose.model('PreOperacaoAprazamento', preOperacaoAprazamentoSchema);