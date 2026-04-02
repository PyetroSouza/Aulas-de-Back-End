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
    allowedHeaders: ['Content-type', 'Authorization'] //Configurações de permissões
    //Tipo de dados //Autorização de acesso 
}

//Aplica as configurações do CORS no app (EXPRESS), o app está usando as opções do cors
app.use(cors(corsOptions))

//Import do arquivo de funções
const estadosCidades = require('./modulo/functions.js')


app.get('/v1/senai/help', function (request, response) {
    let docAPI = {
        "api-description": "API para manipular dados de Estados e Cidades",
        "date": "2026-04-02",
        "development": "Pyetro Ferreira de Souza",
        "version": 1.0,
        "endpoints": [
            {
                "rota1": "/v1/senai/estados",
                "description": "Retorna a lista de todos os estados"
            },
            {
                "rota2": '/v1/senai/dados/estados/sp',
                "description": "Retorna dados de um estado filtrando pela sigla"
            },
            {
                "rota3": '/v1/senai/capital/estado/sp',
                "description": "Retorna dados da capital de um estado filtrando pela sigla"
            },
            {
                "rota4": '/v1/senai/estado/regiao/sudeste',
                "desciption": "Retorna os estado filtrado pela região"
            },
            {
                "rota5": '/v1/senai/estados/capital/pais/brasil',
                "desciption": "Retorna os estados que foram capitais do Brasil"
            },
            {
                "rota6": '/v1/senai/cidade/estado/mg',
                "desciption": "Retorna as cidades filtrando pela sigla do estado"
            }
        ]
    }
    response.status(200)
    response.json(docAPI)
})


//Endpoint para listas os estados
app.get('/v1/senai/estados', function (request, response) {
    let estados = estadosCidades.getListaDeEstados()
    response.json(estados)
    response.status(200)  //Requisição bem sucedida
})

//Retorna dados de um estado filtrando pela sigla do estado
app.get('/v1/senai/dados/estados/:uf', function (request, response) {
    let sigla = request.params.uf
    let dadosEstados = estadosCidades.getDadosEstados(sigla)
    if (dadosEstados) {
        response.json(dadosEstados)
        response.status(200)
    } else {
        response.status(404)
        response.json({ "message": "Nenhum estado foi encontrados" })

    }

})

//Retorna dado da capital filtrando pela sigla do estado
app.get('/v1/senai/capital/estado/:uf', function (request, response) {
    let sigla = request.params.uf
    let capitalEstado = estadosCidades.getCapitalEstado(sigla)
    if (capitalEstado) {
        response.json(capitalEstado)
        response.status(200)
    } else {
        response.status(404)
        response.json({ "message": "Nenhum estado foi encontrados" })

    }
})

//Retorna os estados filtrando pela região
app.get('/v1/senai/estado/regiao/:regiao', function (request, response) {
    let regiao = request.params.regiao
    let estadoRegiao = estadosCidades.getEstadosRegiao(regiao)
    if (estadoRegiao) {
        response.status(200)
        response.json(estadoRegiao)
    } else {
        response.status(404)
        response.json({ "message": "Nenhum estado foi encontrados" })

    }
})

//Retorna os estados que foram capital do Brasil
app.get('/v1/senai/estados/capital/pais/brasil', function (request, response) {
    let estados = estadosCidades.getCapitalPais()
    response.json(estados)
    response.status(200)  //Requisição bem sucedida
})


//Retorna as cidades filtrando pela sigla do estado
app.get('/v1/senai/cidade/estado/:uf', function (request, response) {
    let uf = request.params.uf
    let cidadeEstado = estadosCidades.getCidades(uf)
    if (cidadeEstado) {
        response.status(200)
        response.json(cidadeEstado)
    } else {
        response.status(404)
        response.json({ "message": "Nenhum estado foi encontrados" })

    }
})


app.get('/cidades', function (request, response) {
    response.json({ "message": "Testando a API de cidades" })
    response.status(200)
})

//Fazer o start na API (aguardando as requisições)
app.listen(8080, function () {
    console.log('API agurdando novas requisições...')
})

