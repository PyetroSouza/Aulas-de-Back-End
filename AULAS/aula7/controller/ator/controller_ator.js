/***************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD de filme
 * Data: 17/04/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***************************************************************************************************************/

//Import do arquivo de conigurações de mensagens do projeto
const configMessage = require("../modulo/configMessage.js")

//Import do arquivo do DAO para manipular os dados de filme no Banco de Dados
const atorDAO = require('../../model/DAO/ator/ator.js')

//Import das Controllers
const controllerSexo = require('../sexo/controller_sexo.js')
const controllerFoto = require('../foto/controller_foto.js')
const controllerNacionalidade = require('../nacionalidade/controller_nacionalidade.js')
const controllerAtividade = require('../atividade/controller_atividade.js')

const controllerAtorFoto = require('../ator/controller_ator_foto.js')
const controllerAtorNacionalidade = require('../ator/controller_ator_nacionalidade.js')
const controllerAtorAtividade = require('../ator/controller_ator_atividade.js')
const controllerFilmeAtor = require('../filme/controller_filme_ator.js')

const inserirNovoAtor = async function (ator, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDados(ator)

            if (validar) {
                return validar
            } else {
                let result = await atorDAO.insertAtor((ator))

                if (result) {
                    ator.id = result

                    for (let foto of ator.foto) {
                        let atorFoto = {
                            "id_ator": ator.id,
                            "id_foto": foto.id
                        }

                        let resultAtorFoto = await controllerAtorFoto.inserirNovoAtorFoto(atorFoto)
                        if (!resultAtorFoto.status) {
                            return customMessage.SUCCESS_CREATED_ITEM_WARNING
                        }
                    }
                    for (let nacionalidade of ator.nacionalidade) {
                        let atorNacionalidade = {
                            "id_ator": ator.id,
                            "id_nacionalidade": nacionalidade.id
                        }
                        let resultAtorNacionalidade = await controllerAtorNacionalidade.inserirNovoAtorNacionalidade(atorNacionalidade)
                        if (!resultAtorNacionalidade.status) {
                            return customMessage.SUCCESS_CREATED_ITEM_WARNING
                        }
                    }
                    for (let atividade of ator.atividade) {
                        let atorAtividade = {
                            "id_ator": ator.id,
                            "id_atividade": atividade.id
                        }
                        let resultAtorAtividade = await controllerAtorAtividade.inserirNovoAtorAtividade(atorAtividade)
                        if (!resultAtorAtividade.status) {
                            return customMessage.SUCCESS_CREATED_ITEM_WARNING
                        }
                    }
                    for (let filme of ator.filme) {
                        let atorFilme = {
                            "id_filme": filme.id,
                            "id_ator": ator.id
                        }
                        let resultAtorFilme = await controllerFilmeAtor.inserirNovoFilmeAtor(atorFilme)
                        if (!resultAtorFilme.status) {
                            return customMessage.SUCCESS_CREATED_ITEM_WARNING
                        }
                    }

                    ator.id = result
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = ator
                    return customMessage.DEFAULT_MESSAGE
                } else {
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarAtor = async function (ator, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let resultBuscarAtor = await buscarAtor(id)
            if (resultBuscarAtor.status) {
                let validar = await validarDados(ator)
                if (!validar) {
                    ator.id = Number(id)
                    let result = await atorDAO.updateAtor((ator))

                    if (result) {
                        let resultDeleteFotos = await controllerAtorFoto.excluirFotosIdAtor(ator.id)
                        if (resultDeleteFotos.status) {
                            for (let itemAtor of ator.foto) {
                                let fotoAtor = {
                                    "id_ator": ator.id,
                                    "id_foto": itemAtor.id
                                }
                                let resultAtorFoto = await controllerAtorFoto.inserirNovoAtorFoto(fotoAtor)
                                if (!resultAtorFoto.status) {
                                    return customMessage.SUCCESS_CREATED_ITEM_WARNING
                                }
                            }

                        }
                        let resultDeleteNacionalidades = await controllerAtorNacionalidade.excluirNacionalidadeIdAtor(ator.id)
                        if (resultDeleteNacionalidades.status) {
                            for (let itemAtor of ator.nacionalidade) {
                                let nacionalidadeAtor = {
                                    "id_ator": ator.id,
                                    "id_nacionalidade": itemAtor.id
                                }
                                let resultAtorNacionalidade = await controllerAtorNacionalidade.inserirNovoAtorNacionalidade(nacionalidadeAtor)
                                if (!resultAtorNacionalidade.status) {
                                    return customMessage.SUCCESS_CREATED_ITEM_WARNING
                                }
                            }
                        }
                        let resultDeleteAtividades = await controllerAtorAtividade.excluirAtividadeIdAtor(ator.id)
                        if (resultDeleteAtividades.status) {
                            for (let itemAtor of ator.atividade) {
                                let atividadeAtor = {
                                    "id_ator": ator.id,
                                    "id_atividade": itemAtor.id
                                }
                                let resultAtorAtividade = await controllerAtorAtividade.inserirNovoAtorAtividade(atividadeAtor)
                                if (!resultAtorAtividade.status) {
                                    return customMessage.SUCCESS_CREATED_ITEM_WARNING
                                }
                            }
                        }
                        let resultDeleteFilmes = await controllerFilmeAtor.excluirFilmesIdAtor(ator.id)
                        if (resultDeleteFilmes.status) {
                            for (let itemFilme of ator.filme) {
                                let atorFilme = {
                                    "id_filme": itemFilme.id,
                                    "id_ator": ator.id
                                }
                                let resultAtorFilme = await controllerFilmeAtor.inserirNovoFilmeAtor(atorFilme)
                                if (!resultAtorFilme.status) {
                                    return customMessage.SUCCESS_CREATED_ITEM_WARNING
                                }
                            }
                        }
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATE_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATE_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATE_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = ator

                        return customMessage.DEFAULT_MESSAGE //200
                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return validar
                }
            } else {
                return resultBuscarAtor
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const listarAtor = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let result = await atorDAO.selectAllAtor()
        if (result) {
            if (result.length > 0) {
                for (ator of result) {
                    let resultSexo = await controllerSexo.buscarSexo(ator.id_sexo)
                    if (resultSexo.status) {
                        ator.sexo = resultSexo.response.sexo
                        delete ator.id_sexo
                    }
                    let resultFotos = await controllerAtorFoto.buscarFotosIdAtor(ator.id)
                    if (resultFotos.status) {
                        ator.fotos = resultFotos.response.fotos_ator
                    }
                    let resultNacionalidades = await controllerAtorNacionalidade.buscarNacionalidadeIdAtor(ator.id)
                    if (resultNacionalidades.status) {
                        ator.nacionalidade = resultNacionalidades.response.nacionalidades_ator
                    }
                    let resultAtividades = await controllerAtorAtividade.buscarAtividadeIdAtor(ator.id)
                    if (resultAtividades.status) {
                        ator.atividade = resultAtividades.response.atividades_ator
                    }
                    let resultFilmes = await controllerFilmeAtor.buscarFilmesIdAtor(ator.id)
                    if (resultFilmes.status) {
                        ator.filme = resultFilmes.response.filme_ator
                    }
                }
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.ator = result

                return customMessage.DEFAULT_MESSAGE //200
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
const buscarAtor = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST //400
        } else {
            let result = await atorDAO.selectByIdAtor(id)

            if (result) {
                if (result.length > 0) {
                    for (ator of result) {
                        let resultSexo = await controllerSexo.buscarSexo(ator.id_sexo)
                        if (resultSexo.status) {
                            ator.sexo = resultSexo.response.sexo
                            delete ator.id_sexo
                        }
                        let resultFotos = await controllerAtorFoto.buscarFotosIdAtor(ator.id)
                        if (resultFotos.status) {
                            ator.fotos = resultFotos.response.fotos_ator
                        }
                        let resultNacionalidades = await controllerAtorNacionalidade.buscarNacionalidadeIdAtor(ator.id)
                        if (resultNacionalidades.status) {
                            ator.nacionalidade = resultNacionalidades.response.nacionalidades_ator
                        }
                        let resultAtividades = await controllerAtorAtividade.buscarAtividadeIdAtor(ator.id)
                        if (resultAtividades.status) {
                            ator.atividade = resultAtividades.response.atividades_ator
                        }
                        let resultFilmes = await controllerFilmeAtor.buscarFilmesIdAtor(ator.id)
                        if (resultFilmes.status) {
                            ator.filme = resultFilmes.response.filme_ator
                        }
                    }
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.ator = result

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
const excluirAtor = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let buscarAutorResult = await buscarAtor(id)

        if (buscarAutorResult.status) {
            let result = await atorDAO.deleteAtor(id)

            if (result) {
                customMessage.DEFAULT_MESSAGE.status
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_DELETED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_DELETED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_DELETED_ITEM.message

                return customMessage.DEFAULT_MESSAGE
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return buscarAutorResult
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const validarDados = async function (ator) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))

    if (ator.nome == undefined || ator.nome == "" || ator.nome == null || ator.nome.length > 100) {
        customMessage.ERROR_BAD_REQUEST.field = "[NOME] INVÁLIDO"
    } else if (ator.data_nascimento == undefined || ator.data_nascimento == "" || ator.data_nascimento == null || isNaN(ator.data_nascimento) || ator.data_nascimento != 10) {
        customMessage.ERROR_BAD_REQUEST.field = "[DATA_NASCIMENTO] INVÁLIDO"
    } else if (ator.ano_inicio_carreira == undefined || ator.ano_inicio_carreira == "" || ator.ano_inicio_carreira == null || isNaN(ator.ano_inicio_carreira) || ator.ano_inicio_carreira != 10) {
        customMessage.ERROR_BAD_REQUEST.field = "[ANO INÍCIO CARREIRA] INVÁLIDO"
    } else if (ator.biografia == undefined || ator.biografia == "" || ator.biografia == null) {
        customMessage.ERROR_BAD_REQUEST.field = "[BIOGRAFIA] INVÁLIDO"
    } else if (ator.id_sexo == undefined || ator.id_sexo == "" || ator.id_sexo == null || isNaN(ator.id_sexo) || ator.id_sexo <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = "[ID_SEXO] INVÁLIDO"
    }
    else if (ator.filme !== undefined && !Array.isArray(ator.filme)) {
        return customMessage.ERROR_BAD_REQUEST

    } else if (ator.nacionalidade !== undefined && !Array.isArray(ator.nacionalidade)) {
        return customMessage.ERROR_BAD_REQUEST

    } else if (ator.foto !== undefined && !Array.isArray(ator.foto)) {
        return customMessage.ERROR_BAD_REQUEST

    } else if (ator.atividade !== undefined && !Array.isArray(ator.atividade)) {
        return customMessage.ERROR_BAD_REQUEST
     } else {
        return false
    }

}

module.exports = {
    inserirNovoAtor,
    atualizarAtor,
    listarAtor,
    buscarAtor,
    excluirAtor,
}