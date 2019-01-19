import 'jest'
import * as request from 'supertest'

let address: string = (<any>global).address


test('post /alertaconsumos' , () => {
    return request(address)
        .post('/alertaconsumos')
        .send({
            cdPreOperacaoAprazamento: '5bff292daf8728001578df8f',
            dtEnvio: '2018-11-28T23:47:57.330Z'
        })
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body._id).toBeDefined()
            expect(response.body.cdPreOperacaoAprazamento).toBe('5bff292daf8728001578df8f')
            expect(response.body.dtEnvio).toBe('2018-11-28T23:47:57.330Z')
        }).catch(fail)
})    

test('get /alertaconsumos' , () => {
    return request(address)
        .get('/alertaconsumos')
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body.items).toBeInstanceOf(Array)
        }).catch(fail)
})

test('get /alertaconsumos/invalidID - not found' , () => {
    return request(address)
        .get('/alertaconsumos/invalidID')
        .then(response => {
            expect(response.status).toBe(404)
        }).catch(fail)
})

test('patch /alertaconsumos/:id', () => {
    return request(address)
    .post('/alertaconsumos')
    //Persistindo o alertaconsumo
    .send({
        cdPreOperacaoAprazamento: '5bff292daf8728001578df8f',
        dtEnvio: '2018-11-28T23:47:57.330Z'
    })
    //Alterando por patch
    .then(response => request(address)
                      .patch(`/alertaconsumos/${response.body._id}`)
                      .send({
                        dtEnvio: '2019-11-28T23:47:57.330Z' 
                      }))
    //Checando a alteração
    .then(response => {
        expect(response.status).toBe(200)
        expect(response.body._id).toBeDefined()
        expect(response.body.dtEnvio).toBe('2019-11-28T23:47:57.330Z')
    })                
    .catch(fail)
})



