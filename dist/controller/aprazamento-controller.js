"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setAprazamento(enviarNotificacao, horaInicial, intervalo, limite) {
    function enviarNotificacaoAgendada() {
        var horaDeExcutar = intervalo === undefined ? null : setTimeout(enviarNotificacaoAgendada, intervalo);
        enviarNotificacao(horaDeExcutar);
    }
    if (horaInicial === undefined) {
        // Corre em intervalos a partir do próximo ciclo de eventos
        return setTimeout(enviarNotificacaoAgendada, 0);
    }
    // Limitar horaInicial a hora de um dia
    horaInicial %= 86400000;
    let dataAtual = new Date();
    let horaAtual;
    horaAtual = dataAtual.getTime() % 86400000;
    if (intervalo === undefined) {
        // Corre uma vez
        // Se horaInicial é no passado, corre no próximo ciclo de eventos
        // Senão, espera o tempo suficiente
        return setTimeout(enviarNotificacaoAgendada, Math.max(0, horaInicial - horaAtual));
    }
    else {
        var primeiroIntervalo = (horaInicial - horaAtual) % intervalo;
        if (primeiroIntervalo < 0)
            primeiroIntervalo += intervalo;
        // Se falta mais do que limite para a próxima hora,
        // corre no próximo ciclo de eventos, agenda para a próxima hora
        // e depois continua em intervalos
        if (limite === undefined || primeiroIntervalo > limite) {
            return setTimeout(function () {
                var horaDeExcutar = setTimeout(enviarNotificacaoAgendada, primeiroIntervalo);
                enviarNotificacao(horaDeExcutar);
            }, 0);
        }
        // Se não, começa apenas na próxima hora e continua em intervalos
        return setTimeout(enviarNotificacaoAgendada, primeiroIntervalo);
    }
}
exports.setAprazamento = setAprazamento;
