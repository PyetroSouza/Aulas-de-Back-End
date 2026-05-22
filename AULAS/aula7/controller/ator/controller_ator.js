/***************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD de filme
 * Data: 17/04/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***************************************************************************************************************/

//Import do arquivo de conigurações de mensagens do projeto
const configMessage = require("../modulo/configMessage.js")

//Import do arquivo do DAO para manipular os dados de filme no Banco de Dados
const atorDAO = require('../../model/DAO/ator/ator.js')

//Import das Controllers
const controllerSexo = require('../sexo/controller_sexo.js')

const inserirNovoAtor = async function (ator, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDados(ator)

            if (validar) {
                return validar
            } else {
                let result = await atorDAO.insertAtor((ator))

                if (result) {
                    ator.id = result
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = ator
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

const atualizarAtor = async function (ator, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let resultBuscarAtor = await buscarAtor(id)
            if (resultBuscarAtor.status) {
                let validar = await validarDados(ator)
                if (!validar) {
                    ator.id = Number(id)
                    let result = await atorDAO.updateAtor((ator))

                    if (result) {
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATE_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATE_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATE_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = ator

                        return customMessage.DEFAULT_MESSAGE //200
                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return validar
                }
            } else {
                return resultBuscarAtor
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const listarAtor = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let result = await atorDAO.selectAllAtor()
        if (result) {
            if (result.length > 0) {
                for (ator of result) {
                    let resultSexo = await controllerSexo.buscarSexo(ator.id_sexo)
                    if (resultSexo.status) {
                        ator.sexo = resultSexo.response.sexo
                        delete ator.id_sexo
                    }
                }
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.ator = result

                return customMessage.DEFAULT_MESSAGE //200
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
const buscarAtor = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST //400
        } else {
            let result = await atorDAO.selectByIdAtor(id)

            if (result) {
                if (result.length > 0) {
                    for (ator of result) {
                        let resultSexo = await controllerSexo.buscarSexo(ator.id_sexo)
                        if (resultSexo.status) {
                            ator.sexo = resultSexo.response.sexo
                            delete ator.id_sexo
                        }
                    }
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.ator = result

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
const excluirAtor = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let buscarAutorResult = await buscarAtor(id)

        if (buscarAutorResult.status) {
            let result = await atorDAO.deleteAtor(id)

            if (result) {
                customMessage.DEFAULT_MESSAGE.status
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_DELETED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_DELETED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_DELETED_ITEM.message

                return customMessage.DEFAULT_MESSAGE
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return buscarDiretorResult
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const validarDados = async function (ator) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))

    if (ator.nome == undefined || ator.nome == "" || ator.nome == null || ator.nome.length > 100) {
        customMessage.ERROR_BAD_REQUEST.field = "[NOME] INVÁLIDO"
    } else if (ator.data_nascimento == undefined || ator.data_nascimento == "" || ator.data_nascimento == null || isNaN(ator.data_nascimento) || ator.data_nascimento != 10) {
        customMessage.ERROR_BAD_REQUEST.field = "[DATA_NASCIMENTO] INVÁLIDO"
    } else if (ator.ano_inicio_carreira == undefined || ator.ano_inicio_carreira == "" || ator.ano_inicio_carreira == null || isNaN(ator.ano_inicio_carreira) || ator.ano_inicio_carreira != 10) {
        customMessage.ERROR_BAD_REQUEST.field = "[ANO INÍCIO CARREIRA] INVÁLIDO"
    } else if (ator.biografia == undefined || ator.biografia == "" || ator.biografia == null) {
        customMessage.ERROR_BAD_REQUEST.field = "[BIOGRAFIA] INVÁLIDO"
    } else if (ator.id_sexo == undefined || ator.id_sexo == "" || ator.id_sexo == null || isNaN(ator.id_sexo) || ator.id_sexo <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = "[ID_SEXO] INVÁLIDO"
    }
    else {
        return false
    }

}

module.exports = {
    inserirNovoAtor,
    atualizarAtor,
    listarAtor,
    buscarAtor,
    excluirAtor,
}