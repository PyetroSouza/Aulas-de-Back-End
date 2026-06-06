/***************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD de Diretor Nacionalidade
 * Data: 05/06/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***************************************************************************************************************/

//Import do arquivo de conigurações de mensagens do projeto
const configMessage = require("../modulo/configMessage.js")

//Import do arquivo do DAO para manipular os dados de filme no Banco de Dados
const diretorNacionalidadeDAO = require('../../model/DAO/diretor_nacionalidade/diretor_nacionalidade.js')

//Função para inserir um novo FilmeGenero
const inserirNovoDiretorNacionalidade = async function (diretorNacionalidade) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        let validar = await validarDados(diretorNacionalidade)

        if (validar) {
            return validar
        } else {
            let result = await diretorNacionalidadeDAO.insertDiretorNacionalidade(diretorNacionalidade)


            if (result) {
                diretorNacionalidade.id = result
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                customMessage.DEFAULT_MESSAGE.response = diretorNacionalidade
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
const atualizarDiretorNacionalidade = async function (diretorNacionalidade, id) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {

        let resultBuscarDiretorNacionalidade = await buscarDiretorNacionalidade(id)

        if (resultBuscarDiretorNacionalidade.status) {
            let validar = await validarDados(diretorNacionalidade)
            if (!validar) {
                diretorNacionalidade.id = Number(id)

                let result = await diretorNacionalidadeDAO.updateDiretorNacionalidade((diretorNacionalidade))

                if (result) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATE_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATE_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATE_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = diretorNacionalidade

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
const listarDiretorNacionalidade = async function () {

    let customMessage = JSON.parse(JSON.stringify(configMessage))


    try {
        let result = await diretorNacionalidadeDAO.selectAllDiretorNacionalidade()

        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.diretor_nacionalidade = result

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
const buscarDiretorNacionalidade = async function (id) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await diretorNacionalidadeDAO.selectByIdDiretorNacionalidade(id)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.diretor_nacionalidade = result

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
const buscarNacionalidadeIdDiretor = async function (idDiretor) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        if (idDiretor == undefined || String(idDiretor).replaceAll(' ', '') == '' || idDiretor == null || isNaN(idDiretor) || idDiretor <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_NACIONALIDADE_DIRETOR] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await diretorNacionalidadeDAO.selectNacionalidadeByIdDiretor(idDiretor)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.nacionalidades_diretor = result

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
const buscarDiretorIdNacionalidade = async function (idNacionalidade) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        if (idNacionalidade == undefined || String(idNacionalidade).replaceAll(' ', '') == '' || idNacionalidade == null || isNaN(idNacionalidade) || idNacionalidade <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_NACIONALIDADE] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await diretorNacionalidadeDAO.selectDiretorByIdNacionalidade(idNacionalidade)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.diretor_nacionalidade = result

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
const excluirDiretorNacionalidade = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let buscarDiretorNacionalidadeResult = await buscarDiretorNacionalidade(id)

        if (buscarDiretorNacionalidadeResult.status) {
            let result = await diretorNacionalidadeDAO.deleteDiretorNacionalidade(id)

            if (result) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_DELETED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_DELETED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_DELETED_ITEM.message

                return customMessage.DEFAULT_MESSAGE
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }

        } else {
            return buscarDiretorNacionalidadeResult
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para excluir alteração de generos com o Filme
const excluirNacionalidadeIdDiretor = async function (idDiretor) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let result = await diretorNacionalidadeDAO.deleteNacionalidadeByIdDiretor(idDiretor)

        if (result) {
            return customMessage.SUCCESS_DELETED_ITEM
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validarDados = async function (diretorNacionalidade) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))

    if (diretorNacionalidade.id_diretor == undefined || diretorNacionalidade.id_diretor == '' || diretorNacionalidade.id_diretor == null || isNaN(diretorNacionalidade.id_diretor) || diretorNacionalidade.id_diretor <= 0) {
       return customMessage.ERROR_BAD_REQUEST.field = '[ID_DIRETOR] INVÁLIDO'
    } else if (diretorNacionalidade.id_nacionalidade == undefined || diretorNacionalidade.id_nacionalidade == '' || diretorNacionalidade.id_nacionalidade == null || isNaN(diretorNacionalidade.id_nacionalidade) || diretorNacionalidade.id_nacionalidade <= 0) {
       return customMessage.ERROR_BAD_REQUEST.field = '[ID_NACIONALIDADE] INVÁLIDO'
    } else {
        return false
    }

}


module.exports = {
    inserirNovoDiretorNacionalidade,
    atualizarDiretorNacionalidade,
    listarDiretorNacionalidade,
    buscarDiretorNacionalidade,
    buscarNacionalidadeIdDiretor,
    buscarDiretorIdNacionalidade,
    excluirDiretorNacionalidade,
    excluirNacionalidadeIdDiretor
}