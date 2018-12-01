import * as mongoose from 'mongoose'
import { Paciente } from './model-pacientes';
import { User } from './model-usuario';
import { Medicamento } from './model-medicamentos';


export interface Aprazamento extends mongoose.Document {
    paciente: mongoose.Types.ObjectId | Paciente,
    horario: Date,
    enfermeira: mongoose.Types.ObjectId | User,
    medicamento: mongoose.Types.ObjectId | Medicamento,
    isConsumido: boolean,
    intervalo: string,
    isCancelado: boolean,
    justificativa: string
  }

const aprazamentoSchema = new mongoose.Schema({
      paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
        required:  false,
      },

      horario:{
        type: Date,
        required:  true,
      },

      enfermeira: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:  true
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
        required:  true
      },

      isCancelado: {
        type: Boolean,
        required: false
      },
      
      justificativa: {
        type: String,
        required:  false
      }
})

export const Aprazamento = mongoose.model<Aprazamento>('Aprazamento', aprazamentoSchema)