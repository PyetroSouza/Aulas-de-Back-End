/***************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD de filme
 * Data: 17/04/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***************************************************************************************************************/

//Import do arquivo de conigurações de mensagens do projeto
const configMessage = require("../modulo/configMessage.js")

//Import do arquivo do DAO para manipular os dados de filme no Banco de Dados
const filmeDAO = require('../../model/DAO/filme/filme.js')


//Função para inserir um novo filme
const inserirNovoFilme = async function (filme, contentType) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Chamando a função para validar a entrada dos dados do filme
            let validar = await validarDados(filme)

            if (validar) {
                return validar
            } else {
                //Encaminha os dados do filme para o DAO inserir no BD
                let result = await filmeDAO.insertFilme(filme)

                if (result) { //201
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message

                    return customMessage.DEFAULT_MESSAGE
                } else { //erro 500
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL//500 model
                }

            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE //415
        }
    }
    catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500 controller
    }
}

//Função para atualizar um filme existente 
const atualizarFilme = async function () {

}

//Função para retornar todos os filmes existentes 
const listarFilme = async function () {

}

//Função para retonar um filme filtrando pelo ID
const buscarFilme = async function (ID) {

}

//Função excluir um filme 
const excluirFilme = async function () {

}

//Função para validar os dados de cadastro do Filme
const validarDados = async function (filme) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))

    if (filme.nome == "" || filme.nome == null || filme.nome == undefined || filme.nome.length > 80) {
        customMessage.ERROR_BAD_REQUEST.field = "[NOME] INVÁLIDO"

    } else if (filme.sinopse == "" || filme.sinopse == null || filme.sinopse == undefined) {
        customMessage.ERROR_BAD_REQUEST.field = "[SINOPSE] INVÁLIDO"

    } else if (filme.capa == "" || filme.capa == null || filme.capa == undefined || filme.capa.length > 255) {
        customMessage.ERROR_BAD_REQUEST.field = "[CAPA] INVÁLIDO"

    } else if (filme.data_lancamento == "" || filme.data_lancamento == null || filme.data_lancamento == undefined || filme.data_lancamento.length != 10) {
        customMessage.ERROR_BAD_REQUEST.field = "[DATA DE LANÇAMENTO] INVÁLIDO"

    } else if (filme.duracao == "" || filme.duracao == null || filme.duracao == undefined || filme.duracao.length < 5) {
        customMessage.ERROR_BAD_REQUEST.field = "[DURAÇÃO] INVÁLIDO"

    } else if (filme.valor == undefined || isNaN(filme.valor) || filme.valor.length > 5) {
        customMessage.ERROR_BAD_REQUEST.field = "[VALOR] INVÁLIDO"

    } else if (filme.avaliacao == undefined || isNaN(filme.avaliacao) || filme.avaliacao.length > 3) {
        customMessage.ERROR_BAD_REQUEST.field = "[AVALIAÇÃO] INVÁLIDO"
    }
    else {
        return false
    }
}

module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme
}