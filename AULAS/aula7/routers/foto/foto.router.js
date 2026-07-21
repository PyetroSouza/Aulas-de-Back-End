/*******************************************************************
 * Objetivo: Arquivo responsável pela organização de rotas de Foto.
 * Autor: Pyetro Ferreira
 * Data: 20/07/2026
 * Versão: 1.0
*******************************************************************/
const express = require('express')
const router = express.Router()
const controllerFoto = require('../../controller/foto/controller_foto.js')
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()

router.post('/', bodyParserJSON, async function (request, response) {

    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerFoto.inserirNovaFoto(dados, contentType)
    response.status(result.status_code)
    response.json(result)

})

router.get('/', async function (request, response) {
    let result = await controllerFoto.listarFoto()

    response.status(result.status_code)
    response.json(result)
})

router.get('/:id', bodyParserJSON, async function (request, response) {
    let id = request.params.id
    let result = await controllerFoto.buscarFoto(id)

    response.status(result.status_code)
    response.json(result)
})

router.put('/:id', bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await controllerFoto.atualizarFoto(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.delete('/:id', async function (request, response) {
    let id = request.params.id
    let result = await controllerFoto.excluirFoto(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router