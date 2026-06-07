/***************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD de atividade
 * Data: 13/05/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***************************************************************************************************************/

//Import do arquivo de conigurações de mensagens do projeto
const configMessage = require("../modulo/configMessage.js")

//Import do arquivo do DAO para manipular os dados de filme no Banco de Dados
const atividadeDAO = require('../../model/DAO/atividade/atividade.js')
const controllerDiretorAtividade = require('../diretor/controller_diretor_atividade.js')
const controllerAtorAtividade = require('../ator/controller_ator_atividade.js')

const { default: knex } = require("knex")

const inserirNovaAtividade = async function (atividade, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDados(atividade)

            if (validar) {
                return validar
            } else {
                let result = await atividadeDAO.insertAtividade((atividade))

                if (result) {
                    atividade.id = result

                    for (let diretor of atividade.diretor) {
                        let atividadeDiretor = {
                            "id_diretor": diretor.id,
                            "id_atividade": atividade.id
                        }
                        let resultAtividadeDiretor = await controllerDiretorAtividade.inserirNovoDiretorAtividade(atividadeDiretor)
                        if (!resultAtividadeDiretor.status) {
                            return customMessage.SUCCESS_CREATED_ITEM_WARNING // 201
                        }
                    }

                    for (let ator of atividade.ator) {
                        let atividadeAtor = {
                            "id_ator": ator.id,
                            "id_atividade": atividade.id
                        }
                        let resultAtividadeAtor = await controllerAtorAtividade.inserirNovoAtorAtividade(atividadeAtor)
                        if (!resultAtividadeAtor.status) {
                            return customMessage.SUCCESS_CREATED_ITEM_WARNING // 201
                        }
                    }


                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = atividade
                    return customMessage.DEFAULT_MESSAGE
                } else {
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        } else {
            return customMessage.ERROR_CONTENT_TUPE
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const atualizarAtividade = async function (atividade, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let resultBuscarAtividade = await buscarAtividade(id)

            if (resultBuscarAtividade.status) {
                let validar = await validarDados(atividade)
                if (!validar) {
                    atividade.id = Number(id)

                    let result = await atividadeDAO.updateAtividade((atividade))

                    if (result) {
                        if (Array.isArray(atividade.diretor)) {
                            let resultDeleteDiretores = await controllerDiretorAtividade.excluirDiretorIdAtividade(atividade.id)
                            if (resultDeleteDiretores.status) {
                                for (let diretor of atividade.diretor) {
                                    let atividadeDiretor = {
                                        "id_diretor": diretor.id,
                                        "id_atividade": atividade.id
                                    }

                                    let resultAtividadeDiretor = await controllerDiretorAtividade.inserirNovoDiretorAtividade(atividadeDiretor)
                                    if (!resultAtividadeDiretor.status) {
                                        return customMessage.SUCCESS_CREATED_ITEM_WARNING // 201
                                    }
                                }
                            }
                        }
                        if (Array.isArray(atividade.ator)) {
                            let resultDeleteAtores = await controllerAtorAtividade.excluirAtorIdAtividade(atividade.id)
                            if (resultDeleteAtores.status) {
                                for (let ator of atividade.ator) {
                                    let atividadeAtor = {
                                        "id_ator": ator.id,
                                        "id_atividade": atividade.id
                                    }

                                    let resultAtividadeAtor = await controllerAtorAtividade.inserirNovoAtorAtividade(atividadeAtor)
                                    if (!resultAtividadeAtor.status) {
                                        return customMessage.SUCCESS_CREATED_ITEM_WARNING // 201
                                    }
                                }
                            }
                        }
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATE_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATE_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATE_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = atividade

                        return customMessage.DEFAULT_MESSAGE
                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return validar
                }
            } else {
                return resultBuscarAtividade
            }
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
        }
    } catch (error) {

    }
}
const listarAtividade = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let result = await atividadeDAO.selectAllAtividade()

        if (result) {
            if (result.length > 0) {
                for (let atividade of result) {

                    let resultDiretores = await controllerDiretorAtividade.buscarDiretorIdAtividade(atividade.id)

                    if (resultDiretores.status) {
                        atividade.diretor = resultDiretores.response.diretor_atividade
                    }
                }
                for (let atividade of result) {

                    let resultAtores = await controllerAtorAtividade.buscarAtorIdAtividade(atividade.id)

                    if (resultAtores.status) {
                        atividade.ator = resultAtores.response.ator_atividade
                    }
                }
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.atividade = result

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
const buscarAtividade = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await atividadeDAO.selectByIdAtividade(id)
            if (result) {
                if (result.length > 0) {
                    for (let atividade of result) {

                        let resultDiretores = await controllerDiretorAtividade.buscarDiretorIdAtividade(atividade.id)

                        if (resultDiretores.status) {
                            atividade.diretor = resultDiretores.response.diretor_atividade
                        }
                    }
                    for (let atividade of result) {

                        let resultAtores = await controllerAtorAtividade.buscarAtorIdAtividade(atividade.id)

                        if (resultAtores.status) {
                            atividade.ator = resultAtores.response.ator_atividade
                        }
                    }
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.genero = result

                    return customMessage.DEFAULT_MESSAGE
                } else {
                    return customMessage.ERROR_NOT_FOUND
                }
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {

    }
}
const excluirAtividade = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let buscarAtividadeResult = await buscarAtividade(id)

        if (buscarAtividadeResult.status) {
            let result = await atividadeDAO.deleteAtividade(id)

            if (result) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_DELETED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_DELETED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_DELETED_ITEM.message

                return customMessage.DEFAULT_MESSAGE
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return buscarAtividadeResult
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const validarDados = async function (atividade) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    if (atividade.area_atuacao == undefined || atividade.area_atuacao == "" || atividade.area_atuacao == null || atividade.area_atuacao > 40) {
        customMessage.ERROR_BAD_REQUEST.field = "[ÁREA ATUAÇÃO] INVÁLIDO"
    }
    else {
        return false
    }
}

module.exports = {
    inserirNovaAtividade,
    atualizarAtividade,
    listarAtividade,
    buscarAtividade,
    excluirAtividade
}