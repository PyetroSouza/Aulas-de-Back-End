/***************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD da classificação
 * Data: 15/05/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***************************************************************************************************************/

//Import do arquivo de conigurações de mensagens do projeto
const configMessage = require("../modulo/configMessage.js")

//Import do arquivo do DAO para manipular os dados de filme no Banco de Dados
const classificacaoDAO = require('../../model/DAO/classificacao/classificacao.js')

const inserirNovaClassificacao = async function (classificacao, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDados(classificacao)

            if (validar) {
                return validar
            } else {
                let result = await classificacaoDAO.insertClassificacao((classificacao))

                if (result) {
                    classificacao.id = result
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = classificacao
                    return customMessage.DEFAULT_MESSAGE
                } else {
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const atualizarClassificacao = async function (classificacao, id, contentType) {
     let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let resultBuscarClassificacao = await buscarClassificacao(id)

            if(resultBuscarClassificacao.status){
                let validar = await validarDados(classificacao)
                if(!validar){
                    classificacao.id = Number(id)

                    let result = await classificacaoDAO.updateClassificacao((classificacao))

                    if(result){
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATE_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATE_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATE_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = classificacao

                        return customMessage.DEFAULT_MESSAGE
                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL
                    } 
                } else {
                    return validar 
                }
            } else {
                return resultBuscarClassificacao
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const listarClassificacao = async function () {

    {
        let customMessage = JSON.parse(JSON.stringify(configMessage))
        try {
            let result = await classificacaoDAO.selectAllClassificacao()

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.count = result.length
                    customMessage.DEFAULT_MESSAGE.response.filme = result

                    return customMessage.DEFAULT_MESSAGE
                } else {
                    return customMessage.ERROR_NOT_FOUND
                }
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        } catch (error) {
            return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
        }
    }
}
const buscarClassificacao = async function (id) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await classificacaoDAO.selectByIdClassificacao(id)

            if(result){
                if (result.length > 0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.classificacao = result

                    return customMessage.DEFAULT_MESSAGE 
                } else {
                    return customMessage.ERROR_NOT_FOUND
                }
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const excluirClassificacao = async function (id) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let buscarClassificacaoResult = await buscarClassificacao(id)

        if(buscarClassificacaoResult.status){
            let result = await classificacaoDAO.deleteClassificacao(id)

            if(result){
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_DELETED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_DELETED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_DELETED_ITEM.message

                return customMessage.DEFAULT_MESSAGE
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return buscarClassificacaoResult
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const validarDados = async function (classificacao) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    if (classificacao.classificacao == undefined || classificacao.classificacao == "" || classificacao.classificacao == null || classificacao.classificacao.length > 5) {
        customMessage.ERROR_BAD_REQUEST.field = '[CLASSIFICAÇÃO] INVÁLIDO'
    } else if (classificacao.descricao == undefined || !isNaN(classificacao.descricao)) {
        customMessage.ERROR_BAD_REQUEST.field = "[DESCRIÇÃO] INVÁILIDO"
    } else if (classificacao.idade_minina == undefined || isNaN(classificacao.idade_minina)) {
        customMessage.ERROR_BAD_REQUEST.field = "[IDADE MÍNIMA] INVÁLIDO"
    } else {
        return false
    }
}

module.exports = {
    inserirNovaClassificacao,
    atualizarClassificacao,
    listarClassificacao,
    buscarClassificacao,
    excluirClassificacao
}