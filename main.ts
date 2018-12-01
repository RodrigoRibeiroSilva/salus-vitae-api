import { Server } from './server/server'
import { usersRouter } from './router/usuarios-router'
import { pacientesRouter } from './router/pacientes-router';
import { medicamentosRouter } from './router/medicamentos-router';
import { aprazamentosRouter } from './router/aprazamentos-router';
import { prescricoesRouter } from './router/prescricoes-router';
import { prontuariosRouter } from './router/prontuarios-router';
import { alertaConsumoRouter } from './router/alerta-consumo-router';
import { opConsumoRodelagemRouter } from './router/op-consumo-rodelagem-router';
import { preOperacaoAprazamentoRouter } from './router/preop-aprazamento-router';

export const server = new Server()

server.initServer([usersRouter, 
                  pacientesRouter, 
                  medicamentosRouter, 
                  aprazamentosRouter, 
                  prescricoesRouter, 
                  prontuariosRouter,
                  alertaConsumoRouter,
                  opConsumoRodelagemRouter,
                  preOperacaoAprazamentoRouter])
  .then(server => {
        console.log('Server is listening on:', server.app.address())
}).catch(error => {
        console.log('Server failed to start')
        console.error(error)
        process.exit(1)
})