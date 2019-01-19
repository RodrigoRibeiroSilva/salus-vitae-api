# Salus Vitae API 

  Salus Vitae é um projeto que visa trazer soluções de software para a área de saúde. Esta API implementa a comunicação com o WebService
  do sistema legado ERP, adimistração do medicamento e monitoramento da dispensa dos remédios pela farmacia.
  
# Sobre o Projeto 
**Motivação**  

  Segundo estudos da Associação Americana de Hospitais cerca de 7.000 pessoas morrem unicamente por erros de medicação. Os erros de     medicação em relatório mais recente do IOM contavam, em 2006, com uma estimativa anual de 400.000 eventos adversos a medicamentos, com consequente custo de 3,5 bilhões de dólares anuais.

**Especificações e Atributos Técnicos**

      get('/opconsumorodelagems') => retorna a lista de todas as operações de consumo
      get('/opconsumorodelagems/:id') => retorna a operação de consumo passada como parâmetro
      post('/opconsumorodelagems') => insere uma nova operação de consumo** 
      put('/opconsumorodelagems/:id') => substitui todo o documento passado como parâmetro
      patch('/opconsumorodelagems/:id') => atualiza parcialmente o documento passado como parâmetro
      del('/opconsumorodelagems/:id') => remove o documento passado como parâmetro
      
 Fazendo uso de tipos genéricos, as demais rotas seguem exatamente a mesma estrutura e implementam os mesmos métodos do protocolo HTTP    sendo elas: /users  /pacientes /prontuarios /medicamentos  /prescricoes 
 
 **A API está atualmente hospedada no servidor do heroku e pode ser acessada pela URL: https://salus-vitae-api.herokuapp.com/opconsumorodelagems**
              
 
 # Equipe do Projeto
 
  Carlos Pessoa, Gabriel Soares, Iago Oliveira, José Vitor Oliveira, Luhan Lacerda, Matheus Braz, Rodolfo Estevam, Rodrigo Ribeiro 
  
  **Equipe de Desenvolvimento Back-end**
  
  Rodrigo Ribeiro 
  
