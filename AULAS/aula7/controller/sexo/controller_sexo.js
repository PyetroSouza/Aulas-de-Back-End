/***************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD de sexo
 * Data: 13/05/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***************************************************************************************************************/
//Import do arquivo de conigurações de mensagens do projeto
const configMessage = require("../modulo/configMessage.js")

//Import do arquivo do DAO para manipular os dados de filme no Banco de Dados
const sexoDAO = require('../../model/DAO/sexo/sexo.js')


const inserirNovoSexo = async function (sexo, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDados(sexo)

            if (validar) {
                return validar
            } else {
                let result = await sexoDAO.insertSexo((sexo))

                if (result) {
                    sexo.id = result
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = sexo
                    return customMessage.DEFAULT_MESSAGE
                } else {
                    return customMessage.ERROR.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const atualizarSexo = async function (sexo, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let resultBuscarSexo = await buscarSexo(id)

            if (resultBuscarSexo.status) {
                let validar = await validarDados(sexo)
                if (!validar) {
                    sexo.id = Number(id)

                    let result = await sexoDAO.updateSexo((sexo))

                    if (result) {
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATE_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATE_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATE_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = sexo

                        return customMessage.DEFAULT_MESSAGE
                    } else {
                        return customMessage.DEFAULT_MESSAGE
                    }
                } else {
                    return validar
                }
            } else {
                return resultBuscarSexo
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const listarSexo = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let result = await sexoDAO.selectAllSexo()
        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.sexo = result

                return customMessage.DEFAULT_MESSAGE
            } else {
                return customMessage.ERROR_NOR_FOUND
            }
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const buscarSexo = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await sexoDAO.selectByIdSexo(id)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.sexo = result

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
const excluirSexo = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let buscarSexoResult = await buscarSexo(id)
        if (buscarSexoResult.status) {
            let result = await sexoDAO.deleteSexo(id)
            if (result) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_DELETED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_DELETED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_DELETED_ITEM.message

                return customMessage.DEFAULT_MESSAGE
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return buscarSexoResult
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validarDados = async function (sexo) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    if (sexo.sexo == undefined || sexo.sexo == "" || sexo.sexo == null || sexo.sexo.length > 15) {
        customMessage.ERROR_BAD_REQUEST.field = "[SEXO] INVÁLIDO"
    } else if (sexo.sigla == undefined || sexo.sigla == "" || sexo.sigla == null || sexo.sigla.length > 3) {
        customMessage.ERROR_BAD_REQUEST.field = "[SIGLA] INVÁLIDO"
    }
    else {
        return false
    }
}


module.exports = {
    inserirNovoSexo,
    atualizarSexo,
    listarSexo,
    buscarSexo,
    excluirSexo
}

