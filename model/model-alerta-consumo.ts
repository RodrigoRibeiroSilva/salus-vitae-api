import * as mongoose from 'mongoose'
import { PreOperacaoAprazamento } from './model-preop-aprazamento'

export interface AlertaConsumo extends mongoose.Document {
    cdPreOperacaoAprazamento: mongoose.Types.ObjectId | PreOperacaoAprazamento,
    dtEnvio: Date
  }

const alertaSchema = new mongoose.Schema({

    cdPreOperacaoAprazamento:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PreOperacaoAprazamento',
        required: true
    },

    dtEnvio: {
        type: Date,
        required:  true
    }
})

export const AlertaConsumo = mongoose.model<AlertaConsumo>('AlertaConsumo', alertaSchema)