/***************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD de Filme Gênero
 * Data: 22/05/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***************************************************************************************************************/

//Import do arquivo de conigurações de mensagens do projeto
const configMessage = require("../modulo/configMessage.js")

//Import do arquivo do DAO para manipular os dados de filme no Banco de Dados
const filmeDiretorDAO = require('../../model/DAO/filme_diretor/filme_diretor.js')

//Função para inserir um novo FilmeGenero
const inserirNovoFilmeDiretor = async function (filmeDiretor) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        let validar = await validarDados(filmeDiretor)

        if (validar) {
            return validar
        } else {
            let result = await filmeDiretorDAO.insertFilmeDiretor((filmeDiretor))


            if (result) {
                filmeDiretor.id = result
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                customMessage.DEFAULT_MESSAGE.response = filmeDiretor
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
const atualizarFilmeDiretor = async function (filmeDiretor, id) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {

        let resultBuscarFilmeDiretor = await buscarFilmeDiretor(id)


        if (resultBuscarFilmeDiretor.status) {
            let validar = await validarDados(filmeDiretor)
            if (!validar) {
                filmeDiretor.id = Number(id)

                let result = await filmeDiretorDAO.updateFilmeDiretor((filmeDiretor))

                if (result) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATE_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATE_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATE_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = filmeDiretor

                    return customMessage.DEFAULT_MESSAGE //200
                } else {
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
            } else {
                return validar
            }
        } else {
            return resultBuscarFilmeDiretor
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
//Função para lista FilmeGenero
const listarFilmeDiretor = async function () {

    let customMessage = JSON.parse(JSON.stringify(configMessage))


    try {
        let result = await filmeDiretorDAO.selectAllFilmeDiretor()

        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.filme_diretor = result

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
const buscarFilmeDiretor = async function (id) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await filmeDiretorDAO.selectByIdFilmeDiretor(id)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_diretor = result

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
const buscarDiretorIdFilme = async function (idFilme) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        if (idFilme == undefined || String(idFilme).replaceAll(' ', '') == '' || idFilme == null || isNaN(idFilme) || idFilme <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await filmeDiretorDAO.selectDiretorByIdFilme(idFilme)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_diretor = result

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
const buscarFilmesIdDiretor = async function (idDiretor) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        if (idDiretor == undefined || String(idDiretor).replaceAll(' ', '') == '' || idDiretor == null || isNaN(idDiretor) || idDiretor <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_DIRETOR] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await filmeDiretorDAO.selectFilmesByIdDiretor(idDiretor)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_diretor = result

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
const excluirFilmeDiretor = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let buscarFilmeDiretorResult = await buscarFilmeDiretor(id)

        if (buscarFilmeDiretorResult.status) {
            let result = await filmeDiretorDAO.deleteFilmeDiretor(id)

            if (result) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_DELETED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_DELETED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_DELETED_ITEM.message

                return customMessage.DEFAULT_MESSAGE
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }

        } else {
            return buscarFilmeDiretorResult
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para excluir alteração de generos com o Filme
const excluirDiretorIdFilme = async function (idFilme) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let result = await filmeDiretorDAO.deleteDiretorByIdFilme(idFilme)

        if (result) {
            return customMessage.SUCCESS_DELETED_ITEM
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirFilmeIdDiretor = async function (idDiretor) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let result = await filmeDiretorDAO.deleteFilmeByIdDiretor(idDiretor)

        if (result) {
            return customMessage.SUCCESS_DELETED_ITEM
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validarDados = async function (filmeDiretor) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))

    if (filmeDiretor.id_filme == undefined || filmeDiretor.id_filme == '' || filmeDiretor.id_filme == null || isNaN(filmeDiretor.id_filme) || filmeDiretor.id_filme <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
    } else if (filmeDiretor.id_diretor == undefined || filmeDiretor.id_diretor == '' || filmeDiretor.id_diretor == null || isNaN(filmeDiretor.id_diretor) || filmeDiretor.id_diretor <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID_DIRETOR] INVÁLIDO'
    } else {
        return false
    }

}



module.exports = {
    inserirNovoFilmeDiretor,
    atualizarFilmeDiretor,
    listarFilmeDiretor,
    buscarFilmeDiretor,
    buscarDiretorIdFilme,
    buscarFilmesIdDiretor,
    excluirFilmeDiretor,
    excluirDiretorIdFilme,
    excluirFilmeIdDiretor
}