/*************************************************************************************
 * Objetivo: Arquivo responsável pela criação de API do projeto de estodos e cidades
 * Data: 01/04/2026
 * Autor: Pyetro Ferreira 
 * Versão: 1.0
 * ***********************************************************************************/ 

/**
 * Para configurar a API
 * Instalar o EXPRESS -> npm install express --save
 *                                              └── serve para registrar o pacote e versão em que foi instalado
 * Dependencia para configurar e utilizar o protocolo HTTP para criar a API
 * Instalar o CORS    -> npm install cors --save
 *                                     └──conjunto de requisições que API deve ter para libearra acesso para o front-end
 * Dependencia  para configurar as permiss]ões de acesso da API
 *  */
//Import das dependencias para criar a API

const express = require('express')
const cors = require('cors')

//Criando um objeto do express para criar a API
const app = express()

//Configurações do CORS da APIs
const corsOptions = {
    origin: ["*"], //Configuração de origem da requisição (IP ou Dominio)
    methods: 'GET', //Configuração dos verbos que serão utilizados na API
    allowedHeaders: ['Content-type','Authorization'] //Configurações de permissões
                     //Tipo de dados //Autorização de acesso 
}

//Aplica as configurações do CORS no app (EXPRESS), o app está usando as opções do cors
app.use(cors(corsOptions))

//Import do arquivo de funções
const estadosCidades = require('./modulo/functions.js')

//Endpoint para listas os estados
app.get('/v1/senai/estados',function(request, response){
    let estados = estadosCidades.getListaDeEstados()
    response.json(estados)
    response.status(200)  //Requisição bem sucedida
})

app.get('/v1/senai/dados/estados/:uf',function(request, response){
    let sigla = request.params.uf
    let dadosEstados = estadosCidades.getDadosEstados(sigla)
    if(dadosEstados){
        response.json(dadosEstados)
        response.status(200)
    } else {
        response.json({"message": "Nenhum estado foi encontrados"})
        response.status(404)
    }

})
app.get('/help',function(request, response){
    response.json({
        "message": "Segue a baixo todas as rotas da API",
        "rotas": [
            '/v1/senai/estados',
            '/v1/senai/dados/estados/:uf',
            '/v1/senai/capital/estado/:uf',
            '/v1/senai/estado/regiao/:regiao',
            '/v1/senai/capital/pais',
            '/v1/senai/cidade/estado/:uf',
        ]
    })
})

app.get('/v1/senai/capital/estado/:uf',function(request, response){
    let sigla = request.params.uf
    let capitalEstado = estadosCidades.getCapitalEstado(sigla)
    response.json(capitalEstado)
    response.status(200)
})

app.get('/v1/senai/estado/regiao/:regiao',function(request, response){
    let regiao = request.params.regiao
    let estadoRegiao = estadosCidades.getEstadosRegiao(regiao)
    response.json(estadoRegiao)
    response.status(200)
})

app.get('/v1/senai/capital/pais',function(request, response){
    let estados = estadosCidades.getCapitalPais()
    response.json(estados)
    response.status(200)  //Requisição bem sucedida
})


app.get('/v1/senai/cidade/estado/:uf',function(request, response){
    let uf = request.params.uf
    let cidadeEstado = estadosCidades.getCidades(uf)
    response.json(cidadeEstado)
    response.status(200)
})


app.get('/cidades',function(request, response){
    response.json({"message": "Testando a API de cidades"})
    response.status(200)
})

//Fazer o start na API (aguardando as requisições)
app.listen(8080, function(){
    console.log('API agurdando novas requisições...')
})