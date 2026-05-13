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

//ENDPOINTS - Tabela Filme
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

app.delete('/v1/senai/locadora/filme/:id', async function (request, response) {
    let id = request.params.id
    let result = await controllerFilme.excluirFilme(id)

    response.status(result.status_code)
    response.json(result)
})


//ENDPOINTS - Tabela Gênero
//Import das controllers do projeto
const controllerGenero = require('./controller/genero/controller_genero.js')

app.post('/v1/senai/locadora/genero', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerGenero.inserirNovoGenero(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/genero', async function (request, response) {

    let result = await controllerGenero.listarGenero()

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/genero/:id', async function (request, response) {
    let id = request.params.id
    let result = await controllerGenero.buscarGenero(id)

    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/genero/:id', bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await controllerGenero.atualizarGenero(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/genero/:id', async function (request, response) {
    let id = request.params.id
    let result = await controllerGenero.excluirGenero(id)

    response.status(result.status_code)
    response.json(result)
})

app.listen(8080, function () {
    console.log('API agurdando novas requisições...')
})

//ENDPOINTS - TABELA NACIONALIDADE
//IMPORT DAS CONTROLLERS DO PROJETO
const controllerNacionalidade = require('./controller/nacionalidade/controller_nacionalidade.js')

app.post('/v1/senai/locadora/nacionalidade', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerNacionalidade.inserirNovaNacionalidade(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.get("/v1/senai/locadora/nacionalidade", async function (request, response) {

    let result = await controllerNacionalidade.listarNacionalidade()

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/nacionalidade/:id', async function (request, response) {
    let id = request.params.id
    let result = await controllerNacionalidade.buscarNacionalidade(id)

    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/nacionalidade/:id', bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await controllerNacionalidade.atualizarNacionalidade(dados, id, contentType)
    response.status(result.status_code)
    response.json(result)

})

app.delete('/v1/senai/locadora/nacionalidade/:id', async function (request, response) {
    let id = request.params.id
    let result = await controllerNacionalidade.excluirNacionalidade(id)

    response.status(result.status_code)
    response.json(result)
})

//ENDPOINTS - TABELA ATIVIDADE
//IMPORT DAS CONTROLLERS DO PROJETO
const controllerAtividade = require('./controller/atividade/controller_atividade.js')

app.post('/v1/senai/locadora/atividade', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerAtividade.inserirNovaAtividade(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/atividade', async function (request, response) {
    let result = await controllerAtividade.listarAtividade()

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/atividade/:id', bodyParserJSON, async function (request, response) {
    let id = request.params.id
    let result = await controllerAtividade.buscarAtividade(id)

    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/atividade/:id', bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await controllerAtividade.atualizarAtividade(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/atividade/:id', async function (request, response) {
    let id = request.params.id
    let result = await controllerAtividade.excluirAtividade(id)

    response.status(result.status_code)
    response.json(result)
})

//ENDPOINTS - TABELA FOTO
//IMPORT DAS CONTROLLERS DO PROJETO
const controllerFoto = require('./controller/foto/controller_foto.js')

app.post('/v1/senai/locadora/foto',bodyParserJSON, async function (request, response) {

    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerFoto.inserirNovaFoto(dados,contentType)
    response.status(result.status_code)
    response.json(result)

})

app.get('/v1/senai/locadora/foto', async function (request,response){
    let result = await controllerFoto.listarFoto()

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/foto/:id', bodyParserJSON, async function (request, response) {
    let id = request.params.id
    let result = await controllerFoto.buscarFoto(id)

    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/foto/:id', bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await controllerFoto.atualizarFoto(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/foto/:id', async function (request, response) {
    let id = request.params.id
    let result = await controllerFoto.excluirFoto(id)

    response.status(result.status_code)
    response.json(result)
})