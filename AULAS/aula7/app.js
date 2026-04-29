/***********************************************
 * Objetivo:
 * Data: 17/04/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***********************************************/


const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Permitindo a utilização do JSON no body das requisições 
const bodyParserJSON = bodyParser.json()

const app = express()

const corsOptions = {
    origin: ["*"],
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: ['Content-type', 'Authorization']

}

app.use(cors(corsOptions))

//Import das controllers do projeto
const controllerFilme = require('./controller/filme/controller_filme.js')

//ENDPOINTS
app.post("/v1/senai/locadora/filme", bodyParserJSON, async function (request, response) {

    //Recebendo o body da requisição
    let dados = request.body

    //Recebendo o tipo de dados da requisição para validar se é JSON
    let contentType = request.headers['content-type']

    let result = await controllerFilme.inserirNovoFilme(dados, contentType)

    response.status(result.status_code)
    response.json(result)

})

app.get("/v1/senai/locadora/filme", async function (request, response) {

    let result = await controllerFilme.listarFilme()

    response.status(result.status_code)
    response.json(result)
})

app.get("/v1/senai/locadora/filme/:id", async function (request, response) {
    //Recebe o id do filme via parametro
    let id = request.params.id

    let result = await controllerFilme.buscarFilme(id)

    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/filme/:id', bodyParserJSON, async function (request, response) {
    //Recebe o content-type da requisição, para voltar se é JSON
    let contentType = request.headers['content-type']
    //Recebe o ID do registro a ser atualizado
    let id = request.params.id
    //Recebe ps dadps dp body, que serão modificados no BD
    let dados = request.body

    //Chama a função para atualizar o filme, devemos 

    let result = await controllerFilme.atualizarFilme(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/filme/:id', async function (request, response){
    let id = request.params.id
    let result = await controllerFilme.excluirFilme(id)

    response.status(result.status_code)
    response.json(result)
})

app.listen(8080, function () {
    console.log('API agurdando novas requisições...')
})

