/*******************************************************************
 * Objetivo: Arquivo responsável pela organização de rotas de Atividade.
 * Autor: Pyetro Ferreira
 * Data: 20/07/2026
 * Versão: 1.0
*******************************************************************/
const express = require('express')
const router = express.Router()
const controllerAtividade = require('../../controller/atividade/controller_atividade.js')
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()

router.post('/', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerAtividade.inserirNovaAtividade(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.get('/', async function (request, response) {
    let result = await controllerAtividade.listarAtividade()

    response.status(result.status_code)
    response.json(result)
})

router.get('/:id', bodyParserJSON, async function (request, response) {
    let id = request.params.id
    let result = await controllerAtividade.buscarAtividade(id)

    response.status(result.status_code)
    response.json(result)
})

router.put('/:id', bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await controllerAtividade.atualizarAtividade(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.delete('/:id', async function (request, response) {
    let id = request.params.id
    let result = await controllerAtividade.excluirAtividade(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router