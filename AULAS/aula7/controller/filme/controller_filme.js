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

//Import das Controllers
const controllerClassificacao = require('../classificacao/controller_classificacao.js')
const controllerFilmeGenero = require('./controller_filme_genero.js')

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
                let result = await filmeDAO.insertFilme(await tratarDados(filme))

                if (result) { //201
                    //Cria o ID no JSON do filme e adiciona o ID gerado gerado no DAO
                    filme.id = result

                    //Manipulação de dados para Inserir os Generos relacionados ao Filme
                    //Percorre o array de genero que chegará na 
                    //requisição pelo objeto Filme
                    for (itemFilme of filme.genero) {
                        let filmeGenero = {
                            "id_filme": filme.id,
                            "id_genero": itemFilme.id
                        }
                        let resultFilmeGenero = await controllerFilmeGenero.inserirNovoFilmeGenero(filmeGenero)
                        console.log(resultFilmeGenero)
                    }

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = filme
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
                    let result = await filmeDAO.updateFilme(await tratarDados(filme))

                    if (result) {
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATE_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATE_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATE_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = filme

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

                //Manipulação dos dados da Classificação 
                //Percorre o array de filme
                for (filme of result) {
                    //Busca na controller da classificação o ID referente a FK da classficação
                    let resultClassificacao = await controllerClassificacao.buscarClassificacao(filme.id_classificacao)
                    //Se encontrar o ID
                    if (resultClassificacao.status) {
                        //Adicionar um atributo classificação no JSON do filme e colocar o resultado com os dados da claissficação
                        filme.classificacao = resultClassificacao.response.classificacao
                        //Apaga o id_classificacao do JSON de filme
                        delete filme.id_classificacao
                    }
                }

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
                    //Manipulação dos dados da Classificação 
                    //Percorre o array de filme
                    for (filme of result) {
                        //Busca na controller da classificação o ID referente a FK da classficação
                        let resultClassificacao = await controllerClassificacao.buscarClassificacao(filme.id_classificacao)
                        //Se encontrar o ID
                        if (resultClassificacao.status) {
                            //Adicionar um atributo classificação no JSON do filme e colocar o resultado com os dados da claissficação
                            filme.classificacao = resultClassificacao.response.classificacao
                            //Apaga o id_classificacao do JSON de filme
                            delete filme.id_classificacao
                        }
                    }
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
        //Chama a função de buscar filme para validar se o filme existe
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
        //Validação para a FK da classificação
    } else if (filme.id_classificacao == undefined || filme.id_classificacao == "" || filme.id_classificacao == null || isNaN(filme.id_classificacao) || filme.id_classificacao <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = "[ID_CLASSIFICAÇÃO] INVÁLIDO"
    }
    else {
        return false
    }
}

//Função para tratar os dados a serem inseridos
const tratarDados = async function (filme) {
    //Tratamento para elimanar a chegada de aspas simples (') como caracter inválido

    filme.nome = filme.nome.replaceAll("'", "")
    filme.sinopse = filme.sinopse.replaceAll("'", "")
    filme.capa = filme.capa.replaceAll("'", "")
    filme.data_lancamento = filme.data_lancamento.replaceAll("'", "")
    filme.duracao = filme.duracao.replaceAll("'", "")
    filme.valor = filme.valor.replaceAll("'", "")
    filme.avaliacao = filme.avaliacao.replaceAll("'", "")


    return filme
}

module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme
}