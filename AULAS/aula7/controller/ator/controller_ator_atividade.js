/***************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD de Ator Atividade
 * Data: 05/06/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***************************************************************************************************************/

//Import do arquivo de conigurações de mensagens do projeto
const configMessage = require("../modulo/configMessage.js")

//Import do arquivo do DAO para manipular os dados de filme no Banco de Dados
const atorAtividadeDAO = require('../../model/DAO/ator_atividade/ator_atividade.js')

//Função para inserir um novo FilmeGenero
const inserirNovoAtorAtividade = async function (atorAtividade) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        let validar = await validarDados(atorAtividade)

        if (validar) {
            return validar
        } else {
            let result = await atorAtividadeDAO.insertAtorAtividade(atorAtividade)


            if (result) {
                atorAtividade.id = result
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                customMessage.DEFAULT_MESSAGE.response = atorAtividade
                return customMessage.DEFAULT_MESSAGE
            }
            else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
//Função para atualizar um novo FilmeGenero
const atualizarAtorAtividade = async function (atorAtividade, id) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {

        let resultBuscarAtorAtividade = await buscarAtorAtividade(id)

        if (resultBuscarAtorAtividade.status) {
            let validar = await validarDados(atorAtividade)
            if (!validar) {
                atorAtividade.id = Number(id)

                let result = await atorAtividadeDAO.updateAtorAtividade((atorAtividade))

                if (result) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATE_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATE_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATE_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = atorAtividade

                    return customMessage.DEFAULT_MESSAGE //200
                } else {
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
            } else {
                return validar
            }
        } else {
            return resultBuscarAtorAtividade
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
//Função para lista FilmeGenero
const listarAtorAtividade = async function () {

    let customMessage = JSON.parse(JSON.stringify(configMessage))


    try {
        let result = await atorAtividadeDAO.selectAllAtorAtividade()

        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.ator_atividade = result

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
//Função para buscar um novo FilmeGenero
const buscarAtorAtividade = async function (id) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await atorAtividadeDAO.selectByIdAtorAtividade(id)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.ator_atividade = result

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
//Função para buscar os generos filtrando pelo ID do Filme
const buscarAtividadeIdAtor = async function (idAtor) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        if (idAtor == undefined || String(idAtor).replaceAll(' ', '') == '' || idAtor == null || isNaN(idAtor) || idAtor <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_ATIVIDADE_ATOR] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await atorAtividadeDAO.selectAtividadeByIdAtor(idAtor)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.atividades_ator = result

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

//Função para buscar os filmes filtrando pelo ID do Genero
const buscarAtorIdAtividade = async function (idAtividade) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        if (idAtividade == undefined || String(idAtividade).replaceAll(' ', '') == '' || idAtividade == null || isNaN(idAtividade) || idAtividade <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_ATIVIDADE] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await atorAtividadeDAO.selectAtorByIdAtividade(idAtividade)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.ator_atividade = result

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
//Função para excluir um FilmeGenero
const excluirAtorAtividade = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let buscarAtorAtividadeResult = await buscarAtorAtividade(id)

        if (buscarAtorAtividadeResult.status) {
            let result = await atorAtividadeDAO.deleteAtorAtividade(id)

            if (result) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_DELETED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_DELETED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_DELETED_ITEM.message

                return customMessage.DEFAULT_MESSAGE
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }

        } else {
            return buscarAtorAtividadeResult
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para excluir alteração de generos com o Filme
const excluirAtividadeIdAtor = async function (idAtor) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let result = await atorAtividadeDAO.deleteAtividadeByIdAtor(idAtor)

        if (result) {
            return customMessage.SUCCESS_DELETED_ITEM
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirAtorIdAtividade = async function (idAtividade) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let result = await atorAtividadeDAO.deleteAtorByIdAtividade(idAtividade)

        if (result) {
            return customMessage.SUCCESS_DELETED_ITEM
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validarDados = async function (atorAtividade) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))

    if (atorAtividade.id_ator == undefined || atorAtividade.id_ator == '' || atorAtividade.id_ator == null || isNaN(atorAtividade.id_ator) || atorAtividade.id_ator <= 0) {
        return customMessage.ERROR_BAD_REQUEST.field = '[ID_ATOR] INVÁLIDO'
    } else if (atorAtividade.id_atividade == undefined || atorAtividade.id_atividade == '' || atorAtividade.id_atividade == null || isNaN(atorAtividade.id_atividade) || atorAtividade.id_atividade <= 0) {
        return customMessage.ERROR_BAD_REQUEST.field = '[ID_ATIVIDADE] INVÁLIDO'
    } else {
        return false
    }

}


module.exports = {
    inserirNovoAtorAtividade,
    atualizarAtorAtividade,
    listarAtorAtividade,
    buscarAtorAtividade,
    buscarAtividadeIdAtor,
    buscarAtorIdAtividade,
    excluirAtorAtividade,
    excluirAtividadeIdAtor,
    excluirAtorIdAtividade
}