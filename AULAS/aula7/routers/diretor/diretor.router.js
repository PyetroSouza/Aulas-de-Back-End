/*******************************************************************
 * Objetivo: Arquivo responsável pela organização de rotas de Diretor.
 * Autor: Pyetro Ferreira
 * Data: 20/07/2026
 * Versão: 1.0
*******************************************************************/
const express = require('express')
const router = express.Router()
const controllerDiretor = require('../../controller/diretor/controller_diretor.js')
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()

router.post('/', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerDiretor.inserirNovoDiretor(dados, contentType)
    response.status(result.status_code)
    response.json(result)
})

router.get('/', async function (request, response) {
    let result = await controllerDiretor.listarDiretor()
    response.status(result.status_code)
    response.json(result)
})

router.get('/:id', bodyParserJSON, async function (request, response) {
    let id = request.params.id
    let result = await controllerDiretor.buscarDiretor(id)

    response.status(result.status_code)
    response.json(result)
})

router.put('/:id', bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await controllerDiretor.atualizarDiretor(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.delete('/:id', bodyParserJSON, async function (request, response) {
    let id = request.params.id
    let result = await controllerDiretor.excluirDiretor(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router