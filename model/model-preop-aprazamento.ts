import * as mongoose from 'mongoose'
import { server } from '../main'
import { NotFoundError } from 'restify-errors';
import { setAprazamento } from '../controller/aprazamento-controller'

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
    cdItem: number,
    cdTpItem: number,
    ordemItem: number,
    quantidade: number
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
      type: Number,
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
    }
    
})

//Middleware para Arzamenar e disparar a rotina do aprazamento.
const saveMiddleware = function(next) {
  const preOperacaoAprazamento: PreOperacaoAprazamento = this
  if(preOperacaoAprazamento){
    let aprazamento = iniciaTimeOut(preOperacaoAprazamento)
    server.aprazamentos.set(preOperacaoAprazamento._id.toString(), aprazamento )
    console.log('Aprazamento agendado Chave: ' + preOperacaoAprazamento._id + " Valor " + aprazamento);
    next()

  }else{
    throw new NotFoundError('Erro ao inserir o aprazamento.')
  }
}

//Middleware para atualizar a rotina da notificação do aprazamento.
const updateMiddleware = function(next) {
  const preOperacaoAprazamento: PreOperacaoAprazamento = this._update
  console.log(preOperacaoAprazamento)
  //Cancela a Rotina de das mensagens de aprazamento
  clearTimeout(server.aprazamentos.get(preOperacaoAprazamento._id.toString()))
  server.aprazamentos.delete(preOperacaoAprazamento._id.toString())
  console.log(server.aprazamentos.entries())
  next()
}


const iniciaTimeOut = function (preOperacaoAprazamento: PreOperacaoAprazamento ){
  //Dados da pre-operação
  let horas = preOperacaoAprazamento.horarioInicial.getHours();
  let minutos = preOperacaoAprazamento.horarioInicial.getMinutes();
  let segundos = preOperacaoAprazamento.horarioInicial.getSeconds();
  let intervalo = preOperacaoAprazamento.intervalo

  //Dados da rotina de notificação
  let horaInicialAprazamento = (( horas * 60 +  minutos )* 60 + segundos ) * 1000
  let intervaloAprazamento = (( 0*60 + intervalo ) * 60 +  0) * 1000

  let aprazamentoNotification = setAprazamento(function(timeout) {
    //console.log("Aprazei") 
    //Lógica para o envio do push notification
    // Send a message to the device corresponding to the provided
    // registration token.
    //var topic = 'highScores';
   /*  var message = {
        token: 'cKyOj3neQFM:APA91bFbK_4nWOtNTBZo6Gj8inw57DqDe6e4KZbVpceQ3U0MqO39puhwi6jrSwxg0WQ8KpTFC1OMphHyP2qn7e9wyYyUPXGfywGMFGZoJV0x-5ocY8sIUWTc9z5HwZga0_b7sJpOzqWs',
        notification:{
          title:"Portugal vs. Denmark",
          body:"great match!"
        }
     
    };

    server.adm.messaging().send(message)
    .then((response) => {
      // Response is a message ID string.
    console.log('Successfully sent message:', response);
    })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
    console.log("Aprazei") */
  }
  , horaInicialAprazamento, intervaloAprazamento, (( 0 * 60 +  0) * 60 + 0) * 1000); 

  return aprazamentoNotification
}


preOperacaoAprazamentoSchema.pre('save', saveMiddleware)
preOperacaoAprazamentoSchema.pre('findOneAndUpdate', updateMiddleware)


export const PreOperacaoAprazamento = mongoose.model<PreOperacaoAprazamento>('PreOperacaoAprazamento', preOperacaoAprazamentoSchema)