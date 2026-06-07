/***************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD de Diretor Atividade
 * Data: 05/06/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***************************************************************************************************************/

//Import do arquivo de conigurações de mensagens do projeto
const configMessage = require("../modulo/configMessage.js")

//Import do arquivo do DAO para manipular os dados de filme no Banco de Dados
const diretorAtividadeDAO = require('../../model/DAO/diretor_atividade/diretor_atividade.js')

//Função para inserir um novo FilmeGenero
const inserirNovoDiretorAtividade = async function (diretorAtividade) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        let validar = await validarDados(diretorAtividade)

        if (validar) {
            return validar
        } else {
            let result = await diretorAtividadeDAO.insertDiretorAtividade(diretorAtividade)


            if (result) {
                diretorAtividade.id = result
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                customMessage.DEFAULT_MESSAGE.response = diretorAtividade
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
const atualizarDiretorAtividade = async function (diretorAtividade, id) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {

        let resultBuscarDiretorAtividade = await buscarDiretorAtividade(id)

        if (resultBuscarDiretorAtividade.status) {
            let validar = await validarDados(diretorAtividade)
            if (!validar) {
                diretorAtividade.id = Number(id)

                let result = await diretorAtividadeDAO.updateDiretorAtividade((diretorAtividade))

                if (result) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATE_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATE_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATE_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = diretorAtividade

                    return customMessage.DEFAULT_MESSAGE //200
                } else {
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
            } else {
                return validar
            }
        } else {
            return resultBuscarDiretorAtividade
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
//Função para lista FilmeGenero
const listarDiretorAtividade = async function () {

    let customMessage = JSON.parse(JSON.stringify(configMessage))


    try {
        let result = await diretorAtividadeDAO.selectAllDiretorAtividade()

        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.diretor_atividade = result

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
const buscarDiretorAtividade = async function (id) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await diretorAtividadeDAO.selectByIdDiretorAtividade(id)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.diretor_atividade = result

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
const buscarAtividadeIdDiretor = async function (idDiretor) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        if (idDiretor == undefined || String(idDiretor).replaceAll(' ', '') == '' || idDiretor == null || isNaN(idDiretor) || idDiretor <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_ATIVIDADE_DIRETOR] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await diretorAtividadeDAO.selectAtividadeByIdDiretor(idDiretor)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.atividades_diretor = result

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
const buscarDiretorIdAtividade = async function (idAtividade) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        if (idAtividade == undefined || String(idAtividade).replaceAll(' ', '') == '' || idAtividade == null || isNaN(idAtividade) || idAtividade <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_ATIVIDADE] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await diretorAtividadeDAO.selectDiretorByIdAtividade(idAtividade)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.diretor_atividade = result

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
const excluirDiretorAtividade = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let buscarDiretorAtividadeResult = await buscarDiretorAtividade(id)

        if (buscarDiretorAtividadeResult.status) {
            let result = await diretorAtividadeDAO.deleteDiretorAtividade(id)

            if (result) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_DELETED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_DELETED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_DELETED_ITEM.message

                return customMessage.DEFAULT_MESSAGE
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }

        } else {
            return buscarDiretorAtividadeResult
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para excluir alteração de generos com o Filme
const excluirAtividadeIdDiretor = async function (idDiretor) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let result = await diretorAtividadeDAO.deleteAtividadeByIdDiretor(idDiretor)

        if (result) {
            return customMessage.SUCCESS_DELETED_ITEM
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirDiretorIdAtividade = async function (idAtividade) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let result = await diretorAtividadeDAO.deleteDiretorByIdAtividade(idAtividade)

        if (result) {
            return customMessage.SUCCESS_DELETED_ITEM
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const validarDados = async function (diretorAtividade) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))

    if (diretorAtividade.id_diretor == undefined || diretorAtividade.id_diretor == '' || diretorAtividade.id_diretor == null || isNaN(diretorAtividade.id_diretor) || diretorAtividade.id_diretor <= 0) {
        return customMessage.ERROR_BAD_REQUEST.field = '[ID_DIRETOR] INVÁLIDO'
    } else if (diretorAtividade.id_atividade == undefined || diretorAtividade.id_atividade == '' || diretorAtividade.id_atividade == null || isNaN(diretorAtividade.id_atividade) || diretorAtividade.id_atividade <= 0) {
        return customMessage.ERROR_BAD_REQUEST.field = '[ID_ATIVIDADE] INVÁLIDO'
    } else {
        return false
    }

}


module.exports = {
    inserirNovoDiretorAtividade,
    atualizarDiretorAtividade,
    listarDiretorAtividade,
    buscarDiretorAtividade,
    buscarAtividadeIdDiretor,
    buscarDiretorIdAtividade,
    excluirDiretorAtividade,
    excluirAtividadeIdDiretor,
    excluirDiretorIdAtividade
}