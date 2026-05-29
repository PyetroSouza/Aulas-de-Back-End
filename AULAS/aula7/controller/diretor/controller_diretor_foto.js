/***************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD de Diretor Foto
 * Data: 22/05/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***************************************************************************************************************/

//Import do arquivo de conigurações de mensagens do projeto
const configMessage = require("../modulo/configMessage.js")

//Import do arquivo do DAO para manipular os dados de filme no Banco de Dados
const diretorFotoDAO = require('../../model/DAO/diretor_foto/diretor_foto.js')

//Função para inserir um novo FilmeGenero
const inserirNovoDiretorFoto = async function (diretorFoto) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        let validar = await validarDados(diretorFoto)

        if (validar) {
            return validar
        } else {
            let result = await diretorFotoDAO.insertDiretorFoto((diretorFoto))


            if (result) {
                diretorFoto.id = result
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                customMessage.DEFAULT_MESSAGE.response = diretorFoto
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
const atualizarDiretorFoto = async function (diretorFoto, id) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {

        let resultBuscarDiretorFoto = await buscarFilmeGenero(id)

        if (resultBuscarDiretorFoto.status) {
            let validar = await validarDados(diretorFoto)
            if (!validar) {
                diretorFoto.id = Number(id)

                let result = await diretorFotoDAO.updateFilmeGenero((diretorFoto))

                if (result) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATE_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATE_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATE_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = diretorFoto

                    return customMessage.DEFAULT_MESSAGE //200
                } else {
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
            } else {
                return validar
            }
        } else {
            return resultBuscarDiretorFoto
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
//Função para lista FilmeGenero
const listarDiretorFoto = async function () {

    let customMessage = JSON.parse(JSON.stringify(configMessage))


    try {
        let result = await diretorFotoDAO.selectAllFilmeGenero()

        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.diretor_foto = result

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
const buscarDiretorFoto = async function (id) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await diretorFotoDAO.selectByIdDiretorFoto(id)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.diretor_foto = result

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
const buscarFotosIdDiretor = async function (idDiretor) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        if (idDiretor == undefined || String(idDiretor).replaceAll(' ', '') == '' || idDiretor == null || isNaN(idDiretor) || idDiretor <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await filmeGeneroDAO.selectGeneroByIdFilme(idDiretor)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.do = result

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
const buscarDiretorIdFoto = async function (idFoto) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        if (idFoto == undefined || String(idFoto).replaceAll(' ', '') == '' || idFoto == null || isNaN(idFoto) || idFoto <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_FOTO] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await filmeGeneroDAO.selectFilmesByIdGenero(idFoto)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.diretor_foto = result

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
const excluirDiretorFilme = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let buscarDiretotFotoResult = await buscarDiretorFoto(id)

        if (buscarDiretotFotoResult.status) {
            let result = await diretorFotoDAO.deleteDiretorFoto(id)

            if (result) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_DELETED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_DELETED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_DELETED_ITEM.message

                return customMessage.DEFAULT_MESSAGE
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }

        } else {
            return buscarDiretotFotoResult
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para excluir alteração de generos com o Filme
const excluirFotosIdDiretor = async function (idDiretor) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let result = await di.deleteGenerosByIdFilme(idDiretor)

        if (result) {
            return customMessage.SUCCESS_DELETED_ITEM
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validarDados = async function (diretorFoto) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))

    if (diretorFoto.id_filme == undefined || diretorFoto.id_filme == '' || diretorFoto.id_filme == null || isNaN(diretorFoto.id_diretor) || diretorFoto.id_diretor <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID_DIRETOR] INVÁLIDO'
    } else if (diretorFoto.id_foto == undefined || diretorFoto.id_foto == '' || diretorFoto.id_foto == null || isNaN(diretorFoto.id_foto) || diretorFoto.id_foto <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID_FOTO] INVÁLIDO'
    } else {
        return false
    }

}



module.exports = {
    inserirNovoDiretorFoto,
    atualizarDiretorFoto,
    listarDiretorFoto,
    buscarDiretorFoto,
    buscarFotosIdDiretor,
    buscarDiretorIdFoto,
    excluirDiretorFilme,
    excluirFotosIdDiretor
}