import * as mongoose from 'mongoose'
import { Medicamento } from './model-medicamentos'
import { User } from './model-usuario'


export interface Prescricao extends mongoose.Document {
    medicoId: mongoose.Types.ObjectId | User,
    medicamentos: mongoose.Types.ObjectId | Medicamento []  
}

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
})

export const Prescricao = mongoose.model<Prescricao>('Prescricao', prescricaoSchema)