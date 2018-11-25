import * as mongoose from 'mongoose'
import { server } from '../main'
import { NotFoundError } from 'restify-errors';
import { Agendamento } from '../model/model-agendameto'
import { AlertaConsumo } from '../model/model-alerta-consumo'

export interface PreOperacaoAprazamento extends mongoose.Document {
    //Dados do Aprazamento
    status: boolean,
    cdProntuario: number,
    cdAtendimento: number,
    cdPrescricao: number,
    dtPreOpAprazamento: Date,
    horarioInicial: Date,
    intervalo: number,
    //Dados do medicamento Aprazado
    cdItem: string,
    cdTpItem: number,
    ordemItem: number,
    quantidade: number,

    nmUsuario: string,
    nmPaciente: string,
    nmMedicamento: string

  }

const preOperacaoAprazamentoSchema = new mongoose.Schema({
  //Dados do Aprazamento
      status:{
        type: Boolean,
        required: false,
      },

      cdProntuario: {
        type: Number,
        required:  true
      },
    
      cdAtendimento: {
        type: Number,
        required:  true
      },

      cdPrescricao: {
        type: Number,
        required:  true
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
      type: String,
      required:  true
    },
      
    cdTpItem: {
      type: Number,
      required:  true
    },
     
    ordemItem: {
      type: Number,
      required:  true
    },
    
    quantidade: {
      type: Number,
      required:  true
    },

    nmUsuario: {
      type: String,
      required: true
    },

    nmPaciente: {
      type: String,
      required: true
    },
    
    nmMedicamento: {
      type: String,
      required: true
    }
    
})

//Middleware para Arzamenar e disparar a rotina do aprazamento.
const saveMiddleware = function(next) {
  const preOperacaoAprazamento: PreOperacaoAprazamento = this
  if(preOperacaoAprazamento){
    //Mensagem a ser Enviada
    var message = {
      topic : "aprazamentos",
      notification:{
        title: "Atrazo da admistração",
        body: `Passaram-se 30 minutos da hora de administrar o medicamento: ${preOperacaoAprazamento.nmMedicamento}. No paciente: ${preOperacaoAprazamento.nmPaciente} ` 
      }
   
    };

    //Dados da pre-operação
    let horas = preOperacaoAprazamento.horarioInicial.getHours();
    let minutos = preOperacaoAprazamento.horarioInicial.getMinutes();
    let segundos = preOperacaoAprazamento.horarioInicial.getSeconds();
    let intervalo = preOperacaoAprazamento.intervalo

    //Dados do objeto de Agendamento
    let preopId = preOperacaoAprazamento._id
    
    let horaInicialAprazamento = (( horas * 60 +  minutos )* 60 + segundos ) * 1000
    let intervaloAprazamento = (( 0*60 + intervalo ) * 60 +  0) * 1000

    let agendamento : Agendamento = new Agendamento()
    agendamento.preopId = preopId
    agendamento.message = message
    agendamento.setAprazamento(function(timeout) {

      //Lógica para o envio do push notification
      console.log(`Quantidade:  ${agendamento.quantidadeNotificacoes}`)
      if(agendamento.quantidadeNotificacoes <=  0) {
        clearTimeout(timeout)
        console.log('Rotina Cancelada')
      }else{
        agendamento.enviarMensagem()
        agendamento.parar()
        console.log(server.aprazamentos.entries())
        console.log(`Atualmente existem:  ${server.aprazamentos.size} aprazamentos`)
       
        const alertaConsumo : AlertaConsumo = new AlertaConsumo()
        alertaConsumo.cdPreOperacaoAprazamento = agendamento.preopId
        alertaConsumo.dtEnvio = new Date()

        alertaConsumo.save()
      }
     
    }
    , horaInicialAprazamento, intervaloAprazamento, (( 0 * 60 +  0) * 60 + 0) * 1000); 
  
    server.aprazamentos.set(agendamento.preopId.toString(), agendamento )
    console.log('Aprazamento agendado Chave: ' + agendamento.preopId + " Valor " + agendamento);
    next()

  }else{
    throw new NotFoundError('Erro ao inserir o aprazamento.')
  }
}

//Middleware para atualizar a rotina da notificação do aprazamento.
  const updateMiddleware = function(next) {
  const preOperacaoAprazamento: PreOperacaoAprazamento = this._update

  //Cancela a Rotina de das mensagens de aprazamento
  const agendamento : Agendamento = server.aprazamentos.get(preOperacaoAprazamento._id.toString())
  console.log(agendamento)
  agendamento.parar()

  console.log(server.aprazamentos.entries())
  server.aprazamentos.delete(preOperacaoAprazamento._id.toString())
  console.log(`Após deletar existem:  ${server.aprazamentos.size} aprazamentos`)
  next()
}


preOperacaoAprazamentoSchema.pre('save', saveMiddleware)
preOperacaoAprazamentoSchema.pre('findOneAndUpdate', updateMiddleware)


export const PreOperacaoAprazamento = mongoose.model<PreOperacaoAprazamento>('PreOperacaoAprazamento', preOperacaoAprazamentoSchema)