/***************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD de nacionalidade
 * Data: 17/04/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***************************************************************************************************************/

//Import do arquivo de conigurações de mensagens do projeto
const configMessage = require("../modulo/configMessage.js")

//Import do arquivo do DAO para manipular os dados de filme no Banco de Dados
const nacionalidadeDAO = require('../../model/DAO/nacionalidade/nacionalidade.js')
const controllerDiretorNacionalidade = require('../diretor/controller_diretor_nacionalidade.js')
const controllerAtorNacionalidade = require('../ator/controller_ator_nacionalidade.js')

const inserirNovaNacionalidade = async function (nacionalidade, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDados(nacionalidade)

            if (validar) {
                return validar
            } else {
                let result = await nacionalidadeDAO.insertNacionalidade((nacionalidade))


                if (result) {
                    nacionalidade.id = result
                    for (let diretor of nacionalidade.diretor) {
                        let nacionalidadeDiretor = {
                            "id_diretor": diretor.id,
                            "id_nacionalidade": nacionalidade.id
                        }
                        let resultNacionalidadeDiretor = await controllerDiretorNacionalidade.inserirNovoDiretorNacionalidade(nacionalidadeDiretor)
                        if (!resultNacionalidadeDiretor.status) {
                            return customMessage.SUCCESS_CREATED_ITEM_WARNING // 201
                        }
                    }
                    for (let ator of nacionalidade.ator) {
                        let nacionalidadeAtor = {
                            "id_ator": ator.id,
                            "id_nacionalidade": nacionalidade.id
                        }
                        let resultNacionalidadeAtor = await controllerAtorNacionalidade.inserirNovoAtorNacionalidade(nacionalidadeAtor)
                        if (!resultNacionalidadeAtor.status) {
                            return customMessage.SUCCESS_CREATED_ITEM_WARNING // 201
                        }
                    }
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = nacionalidade
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
const atualizarNacionalidade = async function (nacionalidade, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let resultBuscarNacionalidade = await buscarNacionalidade(id)

            if (resultBuscarNacionalidade.status) {
                let validar = await validarDados(nacionalidade)
                if (!validar) {
                    nacionalidade.id = Number(id)

                    let result = await nacionalidadeDAO.updateNacionalidade((nacionalidade))

                    if (result) {
                        if (Array.isArray(nacionalidade.diretor)) {
                            let resultDeleteDiretores = await controllerDiretorNacionalidade.excluirDiretorIdNacionalidade(nacionalidade.id)
                            if (resultDeleteDiretores.status) {
                                for (let diretor of nacionalidade.diretor) {
                                    let nacionalidadeDiretor = {
                                        "id_diretor": diretor.id,
                                        "id_nacionalidade": nacionalidade.id
                                    }

                                    let resultNacionalidadeDiretor = await controllerDiretorNacionalidade.inserirNovoDiretorNacionalidade(nacionalidadeDiretor)
                                    if (!resultNacionalidadeDiretor.status) {
                                        return customMessage.SUCCESS_CREATED_ITEM_WARNING // 201
                                    }
                                }
                            }
                        }
                        if (Array.isArray(nacionalidade.ator)) {
                            let resultDeleteAtores = await controllerAtorNacionalidade.excluirAtorNacionalidade(nacionalidade.id)
                            if (resultDeleteAtores.status) {
                                for (let ator of nacionalidade.ator) {
                                    let nacionalidadeAtor = {
                                        "id_ator": ator.id,
                                        "id_nacionalidade": nacionalidade.id
                                    }

                                    let resultNacionalidadeAtor = await controllerAtorNacionalidade.inserirNovoAtorNacionalidade(nacionalidadeAtor)
                                    if (!resultNacionalidadeAtor.status) {
                                        return customMessage.SUCCESS_CREATED_ITEM_WARNING // 201
                                    }
                                }
                            }
                        }


                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATE_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATE_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATE_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = nacionalidade

                        return customMessage.DEFAULT_MESSAGE
                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return validar
                }
            } else {
                return resultBuscarNacionalidade
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }
    }
    catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}
const listarNacionalidade = async function () {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        let result = await nacionalidadeDAO.selectAllNacionalidade()

        if (result) {
            if (result.length > 0) {
                for (let nacionalidade of result) {

                    let resultDiretores = await controllerDiretorNacionalidade.buscarDiretorIdNacionalidade(nacionalidade.id)

                    if (resultDiretores.status) {
                        nacionalidade.diretor = resultDiretores.response.diretor_nacionalidade
                    }
                }
                for (let nacionalidade of result) {

                    let resultAtores = await controllerAtorNacionalidade.buscarAtorIdNacionalidade(nacionalidade.id)

                    if (resultAtores.status) {
                        nacionalidade.ator = resultAtores.response.ator_nacionalidade
                    }
                }
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.nacionalidade = result

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
const buscarNacionalidade = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await nacionalidadeDAO.selectByIdNacionalidade(id)
            if (result) {
                if (result.length > 0) {
                    for (let nacionalidade of result) {

                        let resultDiretores = await controllerDiretorNacionalidade.buscarDiretorIdNacionalidade(nacionalidade.id)

                        if (resultDiretores.status) {
                            nacionalidade.diretor = resultDiretores.response.diretor_nacionalidade
                        }
                    }
                    for (let nacionalidade of result) {

                        let resultAtores = await controllerAtorNacionalidade.buscarAtorIdNacionalidade(nacionalidade.id)

                        if (resultAtores.status) {
                            nacionalidade.ator = resultAtores.response.ator_nacionalidade
                        }
                    }
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.nacionalidade = result

                    return customMessage.DEFAULT_MESSAGE
                } else {
                    return customMessage.ERROR_NOT_FOUND
                }
            } else {
                return customMessage.ERROR_NOT_FOUND
            }
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const excluirNacionalidade = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let buscarNacionalidadeResult = await buscarNacionalidade(id)

        if (buscarNacionalidadeResult.status) {
            let result = await nacionalidadeDAO.deleteNacionalidade(id)
            if (result) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_DELETED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_DELETED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_DELETED_ITEM.message

                return customMessage.DEFAULT_MESSAGE
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return buscarNacionalidadeResult
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const validarDados = async function (nacionalidade) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))

    if (nacionalidade.nacionalidade == undefined || nacionalidade.nacionalidade == '' || nacionalidade.nacionalidade == null || nacionalidade.nacionalidade.length > 25) {
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