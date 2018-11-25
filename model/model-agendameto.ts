import { server } from '../main'

export class Agendamento {

    quantidadeNotificacoes = 1
    preopId
    message
    

    constructor (){   
    }


    public setAprazamento(callback, horaInicial, intervalo, limite) {
        function enviarNotificacaoAgendada() {
            var horaDeExcutar = intervalo === undefined ? null : setTimeout(enviarNotificacaoAgendada, intervalo);
            callback(horaDeExcutar);
        }
    
        if (horaInicial === undefined) {
            // Corre em intervalos a partir do próximo ciclo de eventos
            return setTimeout(enviarNotificacaoAgendada, 0);
        }
        // Limitar horaInicial a hora de um dia
        horaInicial %= 86400000;
    
        let dataAtual : Date = new Date();
        let horaAtual : number
        horaAtual = dataAtual.getTime() % 86400000 
    
        if (intervalo === undefined) {
            // Corre uma vez
            // Se horaInicial é no passado, corre no próximo ciclo de eventos
            // Senão, espera o tempo suficiente
            return setTimeout(enviarNotificacaoAgendada, Math.max(0, horaInicial - horaAtual));
        }
        else {
            var primeiroIntervalo = (horaInicial - horaAtual) % intervalo;
            if (primeiroIntervalo < 0) primeiroIntervalo += intervalo;
            // Se falta mais do que limite para a próxima hora,
            // corre no próximo ciclo de eventos, agenda para a próxima hora
            // e depois continua em intervalos
            if (limite === undefined || primeiroIntervalo > limite) {
                return setTimeout(function () {
                    var horaDeExcutar = setTimeout(enviarNotificacaoAgendada, primeiroIntervalo);
                    callback(horaDeExcutar);
                }, 0);
            }
            // Se não, começa apenas na próxima hora e continua em intervalos
            return setTimeout(enviarNotificacaoAgendada, primeiroIntervalo);
        }
    }

    public enviarMensagem(){
        server.adm.messaging().send(this.message)
        .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
        
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
     }

    parar = function(){
        this.quantidadeNotificacoes = 0
    }
}