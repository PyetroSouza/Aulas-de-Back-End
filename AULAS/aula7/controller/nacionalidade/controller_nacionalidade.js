/***************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD de nacionalidade
 * Data: 17/04/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***************************************************************************************************************/

//Import do arquivo de conigurações de mensagens do projeto
const configMessage = require("../modulo/configMessage.js")

//Import do arquivo do DAO para manipular os dados de filme no Banco de Dados
const generoDAO = require('../../model/DAO/nacionalidade/nacionalidade.js')

const inserirNovaNacionalidade = async function (nacionalidade, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validar = await validarDados(nacionalidade)
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const atualizarNacionalidade = async function (nacionalidade, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}
const listarNacionalidade = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const buscarNacionalidade = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const excluirNacionalidade = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validarDados = async function (nacionalidade) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))

    if (nacionalidade.nacionalidade == undefined || nacionalidade.nacionalidade == '' || nacionalidade.nacionalidade == null || nacionalidade.nacionalidade.lenght > 25) {
        customMessage.ERROR_BAD_REQUEST.field = '[NACIONALIDADE] INVÁLIDO'
    }
    else {
        return false
    }
}

module.exports = {
    inserirNovaNacionalidade,
    atualizarNacionalidade,
    listarNacionalidade,
    buscarNacionalidade,
    excluirNacionalidade
}