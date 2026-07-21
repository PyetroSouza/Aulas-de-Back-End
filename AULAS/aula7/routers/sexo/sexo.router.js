/*******************************************************************
 * Objetivo: Arquivo responsável pela organização de rotas de Sexo.
 * Autor: Pyetro Ferreira
 * Data: 20/07/2026
 * Versão: 1.0
*******************************************************************/
const express = require('express')
const router = express.Router()
const controllerSexo = require('../../controller/sexo/controller_sexo.js')
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()

router.post('/', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerSexo.inserirNovoSexo(dados, contentType)
    response.status(result.status_code)
    response.json(result)
})

router.get('/', async function (request, response) {
    let result = await controllerSexo.listarSexo()
    response.status(result.status_code)
    response.json(result)
})

router.get('/:id', bodyParserJSON, async function (request, response) {
    let id = request.params.id
    let result = await controllerSexo.buscarSexo(id)

    response.status(result.status_code)
    response.json(result)
})

router.put('/:id', bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await controllerSexo.atualizarSexo(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.delete('/:id', bodyParserJSON, async function (request, response) {
    let id = request.params.id
    let result = await controllerSexo.excluirSexo(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router