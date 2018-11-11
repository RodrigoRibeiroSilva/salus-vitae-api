"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
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
exports.OpConsumoRodelagem = mongoose.model('OpConsumoRodelagem', opConsumoRodelagemSchema);
