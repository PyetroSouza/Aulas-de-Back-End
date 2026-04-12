/**
 * Objetivo: Arquivo responsável pela criação da API para o projeto Whatsapp
 * Data: 11/04/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 */

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

app.get('/v1/whatsapp/help', function (request, response) {
})

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

app.listen(8080, function () {
    console.log('API agurdando novas requisições...')
})