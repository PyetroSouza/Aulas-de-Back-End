/***************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD de filme
 * Data: 17/04/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***************************************************************************************************************/

//Import do arquivo de conigurações de mensagens do projeto
const configMessage = require("../modulo/configMessage.js")

//Import do arquivo do DAO para manipular os dados de filme no Banco de Dados
const filmeDAO = require('../../model/DAO/filme/filme.js')


//Função para inserir um novo filme
const inserirNovoFilme = async function (filme, contentType) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Chamando a função para validar a entrada dos dados do filme
            let validar = await validarDados(filme)

            if (validar) {
                return validar
            } else {
                //Encaminha os dados do filme para o DAO inserir no BD
                let result = await filmeDAO.insertFilme(filme)

                if (result) { //201
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message

                    return customMessage.DEFAULT_MESSAGE
                } else { //erro 500
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL//500 model
                }

            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE //415
        }
    }
    catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500 controller
    }
}

//Função para atualizar um filme existente 
const atualizarFilme = async function (filme, id, contentType) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        //Validação para verificar se o conteúdo do Body é um JSON
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Chama a função para buscar o filme e validar se o ID está correto, 
            //Se o ID existe no BD e se o FIlme existe
            let resultBuscarFilme = await buscarFilme(id)

            if (resultBuscarFilme.status) {
                //Chamar a função para validar os dados para alteração filme (Body)
                let validar = await validarDados(filme)
                if (!validar) {
                    //Adicionar um atributo ID no JSON de filme, para enviar ao DAO um único objeto
                    filme.id = Number(id)

                    //Chama a função para atualizar o filme no BD
                    let result = await filmeDAO.updateFilme(filme)

                    if (result) {
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATE_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATE_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATE_ITEM.message

                        return customMessage.DEFAULT_MESSAGE //200
                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL //500 (MODELO)
                    }
                } else {
                    return validar //400 de validação dos campos do banco de dados
                }
            } else {
                return resultBuscarFilme //400(id inválido) ou 404(não encontrado) ou 500 (contraller e model)
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE //415
        }


    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500 controller 
    }

}

//Função para retornar todos os filmes existentes 
const listarFilme = async function () {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        //Chama a função DAO para retrona a lista de filmes do BD
        let result = await filmeDAO.selectAllFilme()

        //Validação para verificar se o DAO conseguiu processar o script no BD
        if (result) {
            //Validação para verificar se o conteúdo do array tem dados de retornos
            //Ou retorno se está vazio 
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.filme = result

                return customMessage.DEFAULT_MESSAGE //200
            } else {
                return customMessage.ERROR_NOT_FOUND //404
            }
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500 (model)
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }
}

//Função para retonar um filme filtrando pelo ID
const buscarFilme = async function (id) {

    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        //Validação para garantir que o ID seja um número válido
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST //400

        } else {
            //Chama a função do DAO para pesquisar o filme pelo ID
            let result = await filmeDAO.selectByIdFilme(id)

            //Validação para verificar se o DAO retornou dados ou um FALSE (erro)
            if (result) {
                //Validação para verificar se o DAO sem algum dado no ARRAY 
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme = result

                    return customMessage.DEFAULT_MESSAGE //200
                } else {
                    return customMessage.ERROR_NOT_FOUND //404
                }
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //500 (model)
            }
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }
}

//Função excluir um filme 
const excluirFilme = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        let buscarFilmeResult = await buscarFilme(id)

        if (buscarFilmeResult.status) {
            let result = await filmeDAO.deleteFilme(id)

            if (result) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_DELETED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_DELETED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_DELETED_ITEM.message

                return customMessage.DEFAULT_MESSAGE
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return buscarFilmeResult
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500 
    }
}

//Função para validar os dados de cadastro do Filme
const validarDados = async function (filme) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))

    if (filme.nome == undefined || filme.nome == "" || filme.nome == null || filme.nome.length > 80) {
        customMessage.ERROR_BAD_REQUEST.field = "[NOME] INVÁLIDO"

    } else if (filme.sinopse == undefined || filme.sinopse == "" || filme.sinopse == null) {
        customMessage.ERROR_BAD_REQUEST.field = "[SINOPSE] INVÁLIDO"

    } else if (filme.sinopse == undefined || filme.capa == "" || filme.capa == null || filme.capa.length > 255) {
        customMessage.ERROR_BAD_REQUEST.field = "[CAPA] INVÁLIDO"

    } else if (filme.sinopse == undefined || filme.data_lancamento == "" || filme.data_lancamento == null || filme.data_lancamento.length != 10) {
        customMessage.ERROR_BAD_REQUEST.field = "[DATA DE LANÇAMENTO] INVÁLIDO"

    } else if (filme.sinopse == undefined || filme.duracao == "" || filme.duracao == null || filme.duracao.length < 5) {
        customMessage.ERROR_BAD_REQUEST.field = "[DURAÇÃO] INVÁLIDO"

    } else if (filme.valor == undefined || isNaN(filme.valor) || filme.valor.length > 5) {
        customMessage.ERROR_BAD_REQUEST.field = "[VALOR] INVÁLIDO"

    } else if (filme.avaliacao == undefined || isNaN(filme.avaliacao) || filme.avaliacao.length > 3) {
        customMessage.ERROR_BAD_REQUEST.field = "[AVALIAÇÃO] INVÁLIDO"
    }
    else {
        return false
    }
}

module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme
}