import * as mongoose from 'mongoose'
import { Paciente } from './model.pacientes'
import { Prescricao } from './model.prescricoes'

export interface Prontuario extends mongoose.Document {
    idPaciente: mongoose.Types.ObjectId | Paciente,
    prescricoes: mongoose.Types.ObjectId | Prescricao [],
    ala: string,
    dataAdmissao: Date,
    pesoAdmissao: string,
    dataAlta: Date,
    leito: string
  }

const prontuariosSchema = new mongoose.Schema({

    idPaciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
        required:  true
      },

      prescricoes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prescricao',
        required:  false,
        default: []
      }],

      ala: {
        type: String,
        required:  true
      },
      
      dataAdmissao: {
        type: Date,
        required:  true
      },

      pesoAdmissao: {
        type: String,
        required:  true
      },
      
      dataAlta: {
        type: Date,
        required:  false
      },

      leito: {
        type: String,
        required:  true
      },

 
})

export const Prontuario = mongoose.model<Prontuario>('Prontuario', prontuariosSchema)