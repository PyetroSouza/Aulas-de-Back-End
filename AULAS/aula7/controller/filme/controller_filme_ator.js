/***************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD de Filme Ator
 * Data: 06/06/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***************************************************************************************************************/

//Import do arquivo de conigurações de mensagens do projeto
const configMessage = require("../modulo/configMessage.js")

//Import do arquivo do DAO para manipular os dados de filme no Banco de Dados
const filmeAtorDAO = require('../../model/DAO/filme_ator/filme_ator.js')

const inserirNovoFilmeAtor = async function (filmeAtor) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        let validar = await validarDados(filmeAtor)

        if (validar) {
            return validar
        } else {
            let result = await filmeAtorDAO.insertFilmeAtor(filmeAtor)

            if (result) {
                filmeAtor.id = result
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                customMessage.DEFAULT_MESSAGE.response = filmeAtor
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

const atualizarFilmeAtor = async function (filmeAtor, id) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {

        let resultBuscarFilmeAtor = await buscarFilmeAtor(id)


        if (resultBuscarFilmeAtor.status) {
            let validar = await validarDados(filmeAtor)
            if (!validar) {
                filmeAtor.id = Number(id)

                let result = await filmeAtorDAO.updateFilmeAtor((filmeAtor))

                if (result) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATE_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATE_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATE_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = filmeAtor

                    return customMessage.DEFAULT_MESSAGE //200
                } else {
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
            } else {
                return validar
            }
        } else {
            return resultBuscarFilmeAtor
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarFilmeAtor = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        let result = await filmeAtorDAO.selectAllFilmeAtor()

        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.filme_ator = result

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

const buscarFilmeAtor = async function (id) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await filmeAtorDAO.selectByIdFilmeAtor(id)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_ator = result

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
const buscarAtorIdFilme = async function (idFilme) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        if (idFilme == undefined || String(idFilme).replaceAll(' ', '') == '' || idFilme == null || isNaN(idFilme) || idFilme <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await filmeAtorDAO.selectAtorByIdFilme(idFilme)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_ator = result

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
const buscarFilmesIdAtor = async function (idAtor) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        if (idAtor == undefined || String(idAtor).replaceAll(' ', '') == '' || idAtor == null || isNaN(idAtor) || idAtor <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_ATOR] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await filmeAtorDAO.selectFilmesByIdAtor(idAtor)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_ator = result

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
const excluirFilmeAtor = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let buscarFilmeAtorResult = await buscarFilmeAtor(id)

        if (buscarFilmeAtorResult.status) {
            let result = await filmeAtorDAO.deleteFilmeAtor(id)

            if (result) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_DELETED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_DELETED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_DELETED_ITEM.message

                return customMessage.DEFAULT_MESSAGE
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }

        } else {
            return buscarFilmeAtorResult
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para excluir alteração de generos com o Filme
const excluirAtorIdFilme = async function (idFilme) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let result = await filmeAtorDAO.deleteAtorByIdFilme(idFilme)

        if (result) {
            return customMessage.SUCCESS_DELETED_ITEM
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirFilmesIdAtor = async function (idAtor) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let result = await filmeAtorDAO.deleteFilmeByIdAtor(idAtor)
        if (result) {
            return customMessage.SUCCESS_DELETED_ITEM // 200, 204 deletado com sucesso
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
        }

    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}


const validarDados = async function (filmeAtor) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))

    if (filmeAtor.id_filme == undefined || filmeAtor.id_filme == '' || filmeAtor.id_filme == null || isNaN(filmeAtor.id_filme) || filmeAtor.id_filme <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
    } else if (filmeAtor.id_ator == undefined || filmeAtor.id_ator == '' || filmeAtor.id_ator == null || isNaN(filmeAtor.id_ator) || filmeAtor.id_ator <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID_ATOR] INVÁLIDO'
    } else {
        return false
    }
}

module.exports = {
    inserirNovoFilmeAtor,
    atualizarFilmeAtor,
    listarFilmeAtor,
    buscarFilmeAtor,
    buscarAtorIdFilme,
    buscarFilmesIdAtor,
    excluirFilmeAtor,
    excluirAtorIdFilme,
    excluirFilmesIdAtor
}