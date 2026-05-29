/***************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD de filme
 * Data: 17/04/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***************************************************************************************************************/

//Import do arquivo de conigurações de mensagens do projeto
const configMessage = require("../modulo/configMessage.js")

//Import do arquivo do DAO para manipular os dados de filme no Banco de Dados
const diretorDAO = require('../../model/DAO/diretor/diretor.js')

//Import das Controllers
const controllerSexo = require('../sexo/controller_sexo.js')
const controllerDiretorFoto = require('./controller_diretor_foto.js')

const inserirNovoDiretor = async function (diretor, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDados(diretor)

            if (validar) {
                return validar
            } else {
                let result = await diretorDAO.insertDiretor((diretor))

                if (result) {
                    diretor.id = result

                    for(itemDiretor of diretor.foto){
                        let diretorFoto = {
                            "id_diretor": diretor.id,
                            "id_foto": itemDiretor.id 
                        }

                        let resultDiretorFoto = await controllerDiretorFoto.inserirNovoDiretorFoto(diretorFoto)
                        if(!resultDiretorFoto.status){
                            return customMessage.SUCCESS_CREATED_ITEM_WARNING
                        }
                    }

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = diretor
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

const atualizarDiretor = async function (diretor, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let resultBuscarDiretor = await buscarDiretor(id)
            if (resultBuscarDiretor.status) {
                let validar = await validarDados(diretor)
                if (!validar) {
                    diretor.id = Number(id)
                    let result = await diretorDAO.updateDiretor((diretor))

                    if (result) {
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATE_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATE_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATE_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = diretor

                        return customMessage.DEFAULT_MESSAGE //200
                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return validar
                }
            } else {
                return resultBuscarDiretor
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const listarDiretor = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let result = await diretorDAO.selectAllDiretor()
        if (result) {
            if (result.length > 0) {
                for (diretor of result) {
                    let resultSexo = await controllerSexo.buscarSexo(diretor.id_sexo)
                    if (resultSexo.status) {
                        diretor.sexo = resultSexo.response.sexo
                        delete diretor.id_sexo
                    }
                }
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.diretor = result

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
const buscarDiretor = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST //400
        } else {
            let result = await diretorDAO.selectByIdDiretor(id)

            if (result) {
                if (result.length > 0) {
                    for (diretor of result) {
                        let resultSexo = await controllerSexo.buscarSexo(diretor.id_sexo)
                        if (resultSexo.status) {
                            diretor.sexo = resultSexo.response.sexo
                            delete diretor.id_sexo
                        }
                    }
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.diretor = result

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
const excluirDiretor = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let buscarDiretorResult = await buscarDiretor(id)

        if (buscarDiretorResult.status) {
            let result = await diretorDAO.deleteDiretor(id)

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
const validarDados = async function (diretor) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))

    if (diretor.nome == undefined || diretor.nome == "" || diretor.nome == null || diretor.nome.length > 100) {
        customMessage.ERROR_BAD_REQUEST.field = "[NOME] INVÁLIDO"
    } else if (diretor.data_nascimento == undefined || diretor.data_nascimento == "" || diretor.data_nascimento == null || isNaN(diretor.data_nascimento) || diretor.data_nascimento != 10) {
        customMessage.ERROR_BAD_REQUEST.field = "[DATA_NASCIMENTO] INVÁLIDO"
    } else if (diretor.ano_inicio_carreira == undefined || diretor.ano_inicio_carreira == "" || diretor.ano_inicio_carreira == null || isNaN(diretor.ano_inicio_carreira) || diretor.ano_inicio_carreira != 10) {
        customMessage.ERROR_BAD_REQUEST.field = "[ANO INÍCIO CARREIRA] INVÁLIDO"
    } else if (diretor.id_sexo == undefined || diretor.id_sexo == "" || diretor.id_sexo == null || isNaN(diretor.id_sexo) || diretor.id_sexo <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = "[ID_SEXO] INVÁLIDO"
    } else {
        return false
    }

}

module.exports = {
    inserirNovoDiretor,
    atualizarDiretor,
    listarDiretor,
    buscarDiretor,
    excluirDiretor,
}