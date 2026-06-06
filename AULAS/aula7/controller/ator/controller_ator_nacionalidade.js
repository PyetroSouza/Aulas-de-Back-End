/***************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD de Ator Nacionalidade
 * Data: 06/06/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***************************************************************************************************************/

//Import do arquivo de conigurações de mensagens do projeto
const configMessage = require("../modulo/configMessage.js")

//Import do arquivo do DAO para manipular os dados de filme no Banco de Dados
const atorNacionalidadeDAO = require('../../model/DAO/ator_nacionalidade/ator_nacionalidade.js')

//Função para inserir um novo FilmeGenero
const inserirNovoAtorNacionalidade = async function (atorNacionalidade) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        let validar = await validarDados(atorNacionalidade)

        if (validar) {
            return validar
        } else {
            let result = await atorNacionalidadeDAO.insertAtorNacionalidade(atorNacionalidade)


            if (result) {
                atorNacionalidade.id = result
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                customMessage.DEFAULT_MESSAGE.response = atorNacionalidade
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
const atualizarAtorNacionalidade = async function (atorNacionalidade, id) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {

        let resultBuscarAtorNacionalidade = await buscarAtorNacionalidade(id)

        if (resultBuscarAtorNacionalidade.status) {
            let validar = await validarDados(atorNacionalidade)
            if (!validar) {
                atorNacionalidade.id = Number(id)

                let result = await atorNacionalidadeDAO.updateAtorNacionalidade((atorNacionalidade))

                if (result) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATE_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATE_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATE_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = atorNacionalidade

                    return customMessage.DEFAULT_MESSAGE //200
                } else {
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
            } else {
                return validar
            }
        } else {
            return resultBuscarAtorNacionalidade
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
//Função para lista FilmeGenero
const listarAtorNacionalidade = async function () {

    let customMessage = JSON.parse(JSON.stringify(configMessage))


    try {
        let result = await atorNacionalidadeDAO.selectAllAtorNacionalidade()

        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.ator_nacionalidade = result

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
const buscarAtorNacionalidade = async function (id) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await atorNacionalidadeDAO.selectByIdAtorNacionalidade(id)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.ator_nacionalidade = result

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
const buscarNacionalidadeIdAtor = async function (idAtor) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        if (idAtor == undefined || String(idAtor).replaceAll(' ', '') == '' || idAtor == null || isNaN(idAtor) || idAtor <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_NACIONALIDADE_ATOR] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await atorNacionalidadeDAO.selectNacionalidadeByIdAtor(idAtor)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.nacionalidades_ator = result

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
const buscarAtorIdNacionalidade = async function (idNacionalidade) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        if (idNacionalidade == undefined || String(idNacionalidade).replaceAll(' ', '') == '' || idNacionalidade == null || isNaN(idNacionalidade) || idNacionalidade <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_NACIONALIDADE] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await atorNacionalidadeDAO.selectAtorByIdNacionalidade(idNacionalidade)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.ator_nacionalidade = result

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
const excluirAtorNacionalidade = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let buscarAtorNacionalidadeResult = await buscarAtorNacionalidade(id)

        if (buscarAtorNacionalidadeResult.status) {
            let result = await atorNacionalidadeDAO.deleteAtorNacionalidade(id)

            if (result) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_DELETED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_DELETED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_DELETED_ITEM.message

                return customMessage.DEFAULT_MESSAGE
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }

        } else {
            return buscarAtorNacionalidadeResult
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para excluir alteração de generos com o Filme
const excluirNacionalidadeIdAtor = async function (idAtor) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let result = await atorNacionalidadeDAO.deleteNacionalidadeByIdAtor(idAtor)

        if (result) {
            return customMessage.SUCCESS_DELETED_ITEM
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validarDados = async function (atorNacionalidade) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))

    if (atorNacionalidade.id_ator == undefined || atorNacionalidade.id_ator == '' || atorNacionalidade.id_ator == null || isNaN(atorNacionalidade.id_ator) || atorNacionalidade.id_ator <= 0) {
        return customMessage.ERROR_BAD_REQUEST.field = '[ID_ATOR] INVÁLIDO'
    } else if (atorNacionalidade.id_nacionalidade == undefined || atorNacionalidade.id_nacionalidade == '' || atorNacionalidade.id_nacionalidade == null || isNaN(atorNacionalidade.id_nacionalidade) || atorNacionalidade.id_nacionalidade <= 0) {
        return customMessage.ERROR_BAD_REQUEST.field = '[ID_NACIONALIDADE] INVÁLIDO'
    } else {
        return false
    }

}


module.exports = {
    inserirNovoAtorNacionalidade,
    atualizarAtorNacionalidade,
    listarAtorNacionalidade,
    buscarAtorNacionalidade,
    buscarNacionalidadeIdAtor,
    buscarAtorIdNacionalidade,
    excluirAtorNacionalidade,
    excluirNacionalidadeIdAtor
}