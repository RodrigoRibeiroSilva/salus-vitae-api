"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const restify_errors_1 = require("restify-errors");
const model_preop_aprazamento_1 = require("./model-preop-aprazamento");
const opConsumoRodelagemSchema = new mongoose.Schema({
    cdPreOperacaoAprazamento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PreOperacaoAprazamento',
        required: true
    },
    isConsumido: {
        type: Boolean,
        required: true
    },
    dtOperacao: {
        type: Date,
        required: true
    },
    justificativa: {
        type: String,
        required: false,
    },
    //Informações do aparelho e do profissional de saude que ministrou
    deviceUuid: {
        type: String,
        required: true,
    },
    deviceSerial: {
        type: String,
        required: true,
    },
    deviceManufacturer: {
        type: String,
        required: true,
    },
    deviceModel: {
        type: String,
        required: true,
    },
    devicePlatform: {
        type: String,
        required: true,
    },
    deviceVersion: {
        type: String,
        required: true,
    },
});
//Middleware para Arzamenar e disparar a rotina do aprazamento.
const updatePreOpMiddleware = function (next) {
    const opConsumoRodelagem = this;
    if (mongoose.Types.ObjectId.isValid(opConsumoRodelagem._id)) {
        model_preop_aprazamento_1.PreOperacaoAprazamento.findByIdAndUpdate(opConsumoRodelagem.cdPreOperacaoAprazamento, { $set: { status: false }, _id: opConsumoRodelagem.cdPreOperacaoAprazamento }, { new: true }, function (err, document) {
            if (err)
                throw new restify_errors_1.NotFoundError(err);
            console.log(document);
        });
        next();
    }
    else {
        throw new restify_errors_1.NotFoundError('Código da pré-operação inválido');
    }
};
opConsumoRodelagemSchema.pre('save', updatePreOpMiddleware);
exports.OpConsumoRodelagem = mongoose.model('OpConsumoRodelagem', opConsumoRodelagemSchema);
