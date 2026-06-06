/***************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD de Ator Foto
 * Data: 06/06/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***************************************************************************************************************/

//Import do arquivo de conigurações de mensagens do projeto
const configMessage = require("../modulo/configMessage.js")

//Import do arquivo do DAO para manipular os dados de filme no Banco de Dados
const atorFotoDAO = require('../../model/DAO/ator_foto/ator_foto.js')

//Função para inserir um novo FilmeGenero
const inserirNovoAtorFoto = async function (atorFoto) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        let validar = await validarDados(atorFoto)

        if (validar) {
            return validar
        } else {
            let result = await atorFotoDAO.insertAtorFoto(atorFoto)


            if (result) {
                atorFoto.id = result
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                customMessage.DEFAULT_MESSAGE.response = atorFoto
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
const atualizarAtorFoto = async function (atorFoto, id) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {

        let resultBuscarAtorFoto = await buscarAtorFoto(id)

        if (resultBuscarAtorFoto.status) {
            let validar = await validarDados(atorFoto)
            if (!validar) {
                atorFoto.id = Number(id)

                let result = await atorFotoDAO.updateAtorFoto((atorFoto))

                if (result) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATE_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATE_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATE_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = atorFoto

                    return customMessage.DEFAULT_MESSAGE //200
                } else {
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
            } else {
                return validar
            }
        } else {
            return resultBuscarAtorFoto
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
//Função para lista FilmeGenero
const listarAtorFoto = async function () {

    let customMessage = JSON.parse(JSON.stringify(configMessage))


    try {
        let result = await atorFotoDAO.selectAllAtorFoto()

        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.ator_foto = result

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
const buscarAtorFoto = async function (id) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await atorFotoDAO.selectByIdAtorFoto(id)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.ator_foto = result

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
const buscarFotosIdAtor = async function (idAtor) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        if (idAtor == undefined || String(idAtor).replaceAll(' ', '') == '' || idAtor == null || isNaN(idAtor) || idAtor <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_FOTO_ATOR] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await atorFotoDAO.selectFotoByIdAtor(idAtor)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.fotos_ator = result

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
const buscarAtorIdFoto = async function (idFoto) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        if (idFoto == undefined || String(idFoto).replaceAll(' ', '') == '' || idFoto == null || isNaN(idFoto) || idFoto <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_FOTO] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await atorFotoDAO.selectAtorByIdFoto(idFoto)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.ator_foto = result

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
const excluirAtorFilme = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let buscarAtorFotoResult = await buscarAtorFoto(id)

        if (buscarAtorFotoResult.status) {
            let result = await atorFotoDAO.deleteAtorFoto(id)

            if (result) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_DELETED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_DELETED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_DELETED_ITEM.message

                return customMessage.DEFAULT_MESSAGE
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }

        } else {
            return buscarAtorFotoResult
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para excluir alteração de generos com o Filme
const excluirFotosIdAtor = async function (idAtor) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let result = await atorFotoDAO.deleteFotosByIdAtor(idAtor)

        if (result) {
            return customMessage.SUCCESS_DELETED_ITEM
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validarDados = async function (atorFoto) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))

    if (atorFoto.id_ator == undefined || atorFoto.id_ator == '' || atorFoto.id_ator == null || isNaN(atorFoto.id_ator) || atorFoto.id_ator <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID_ATOR] INVÁLIDO'
    } else if (atorFoto.id_foto == undefined || atorFoto.id_foto == '' || atorFoto.id_foto == null || isNaN(atorFoto.id_foto) || atorFoto.id_foto <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID_FOTO] INVÁLIDO'
    } else {
        return false
    }

}


module.exports = {
    inserirNovoAtorFoto,
    atualizarAtorFoto,
    listarAtorFoto,
    buscarAtorFoto,
    buscarFotosIdAtor,
    buscarAtorIdFoto,
    excluirAtorFilme,
    excluirFotosIdAtor
}