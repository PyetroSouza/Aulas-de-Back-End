/***************************************************************************
 * Objetivo: Arquivo responsável pela criação da API para o projeto Whatsapp
 * Data: 11/04/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***************************************************************************/

const express = require('express')
const cors = require('cors')

const app = express()

const corsOptions = {
    origin: ['*'],
    methods: 'GET',
    allowedHeaders: ["Content-type", "Authorization"]
}

app.use(cors(corsOptions))

const contatosMensagens = require("./modulo/functions.js")

app.get('/v1/whatsapp/dados/usarios', function (request, response) {
    let dadosUsarios = contatosMensagens.getDadosUsuarios()
    response.json(dadosUsarios)
    response.status(200)
})

app.get('/v1/whatsapp/dados/usarios/:numero', function (request, response) {
    let numero = request.params.numero
    let dadosUsariosNumero = contatosMensagens.getDadosProfileUsuario(numero)
    if (dadosUsariosNumero) {
        response.status(200)
        response.json(dadosUsariosNumero)
    } else {
        response.status(404)
        response.json({ 'message': "Nenhum numero foi encontrado" })
    }
})

app.get('/v1/whatsapp/dados/usuarios/contatos/:numero', function (request, response) {
    let numero = request.params.numero
    let dadosUsariosContato = contatosMensagens.getDadosCadaUsuario(numero)
    if (dadosUsariosContato) {
        response.status(200)
        response.json(dadosUsariosContato)
    } else {
        response.status(404)
        response.json({ "message": "Nenhum numero foi encontrado" })
    }
})

app.get('/v1/whatsapp/dados/usuarios/contatos/mensagem/:numero', function (request, response) {
    let numero = request.params.numero
    let mensagemUsuario = contatosMensagens.getMensagensUsuario(numero)
    if (mensagemUsuario) {
        response.status(200)
        response.json(mensagemUsuario)
    } else {
        response.status(404)
        response.json({ "message": "Nenhum numero foi encontrado" })
    }
})

app.get('/v1/whatsapp/dados/usuarios/contato/conversa', function(request, response){
    let numero = request.query.numero
    let contato = request.query.contato

    let conversaUsuario = contatosMensagens.getConversaUsuarioContato(numero, contato)
        if (conversaUsuario){
        response.status(200)
        response.json(conversaUsuario)
    } else {
        response.status(404)
        response.json({ message: "Conversa não encontrada" })
    }
})

app.get('/v1/whatsapp/dados/usuarios/contato/palavra', function (request, response){
    let numero = request.query.numero
    let contato = request.query.contato
    let busca = request.query.busca

    let palavraContatoUsuario = contatosMensagens.getFiltroPalavraChave(numero, contato, busca)
    
        if (palavraContatoUsuario){
        response.status(200)
        response.json(palavraContatoUsuario)
    } else {
        response.status(404)
        response.json({ message: "Nenhuma mensagem encontrada" })
    }
})

app.get('/v1/whatsapp/help', function (request, response) {
    let docAPI = {
        "api-description": "API para manipular dados estilo Whatsapp",
        "date": "2026-04-12",
        "development": "Pyetro Ferreira de Souza",
        "version": 1.0,
        "endpoints": [
            {
                "router1": "/v1/whatsapp/dados/usuarios",
                "description": "Retorna a lista de dados de todos os usuários"
            },
            {
                "router2": "/v1/whatsapp/dados/usarios/11987876567",
                "description": "Retorna os dados do usuário, filtrando pelo número"
            },
            {
                "router3": "/v1/whatsapp/dados/usuarios/contatos/11987876567",
                "description": "Retorna uma lista de contatos, filtrando pelo número de telefone do usuário"
            },
            {
                "router4": "/v1/whatsapp/dados/usuarios/contatos/mensagem/11987876567",
                "description": "Retorna uma lista de contatos, com as conversas com respectivo usuário de seus contato, filtrando pelo número do usuário"
            },
            {
                "router5": "/v1/whatsapp/dados/usuarios/contato/conversa?numero=11987876567&contato=Ana%20Maria",
                "description": "Retorna todas as conversas de um determinado contato, filtrando pelo número de usuário e o nome do contato"
            },
            {
                "router6": "/v1/whatsapp/dados/usuarios/contato/palavra?numero=11987876567&contato=Ana%20Maria&busca=beach",
                "description": "Retorna todas as conversas de um usuário com um contato, filtradas pelo número de usuário, nome do contato e da palavra que deseja buscar"
            },
        ]
    }
    response.status(200)
    response.json(docAPI)
})


app.listen(8080, function () {
    console.log('API agurdando novas requisições...')
})