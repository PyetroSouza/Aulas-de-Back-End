/***************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD de filme
 * Data: 17/04/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***************************************************************************************************************/

//Import do arquivo de conigurações de mensagens do projeto
const configMessage = require("../modulo/configMessage.js")

//Import do arquivo do DAO para manipular os dados de filme no Banco de Dados
const diretorDAO = require('../../model/DAO/diretor/diretor.js')

//Import das Controllers
const controllerSexo = require('../sexo/controller_sexo.js')
const controllerFoto = require('../foto/controller_foto.js')
const controllerNacionalidade = require('../nacionalidade/controller_nacionalidade.js')
const controllerAtividade = require('../atividade/controller_atividade.js')

const controllerDiretorFoto = require('./controller_diretor_foto.js')
const controllerDiretorNacionalidade = require("./controller_diretor_nacionalidade.js")
const controllerDiretorAtividade = require('./controller_diretor_atividade.js')
const controllerFilmeDiretor = require('../filme/controller_filme_diretor.js')


const inserirNovoDiretor = async function (diretor, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDados(diretor)

            if (validar) {
                return validar
            } else {
                let result = await diretorDAO.insertDiretor((diretor))

                if (result) {
                    diretor.id = result

                    for (let foto of diretor.foto) {
                        let diretorFoto = {
                            "id_diretor": diretor.id,
                            "id_foto": foto.id
                        }

                        let resultDiretorFoto = await controllerDiretorFoto.inserirNovoDiretorFoto(diretorFoto)
                        if (!resultDiretorFoto.status) {
                            return customMessage.SUCCESS_CREATED_ITEM_WARNING
                        }
                    }
                    for (let nacionalidade of diretor.nacionalidade) {
                        let diretorNacionalidade = {
                            "id_diretor": diretor.id,
                            "id_nacionalidade": nacionalidade.id
                        }
                        let resultDiretorNacionalidade = await controllerDiretorNacionalidade.inserirNovoDiretorNacionalidade(diretorNacionalidade)
                        if (!resultDiretorNacionalidade.status) {
                            return customMessage.SUCCESS_CREATED_ITEM_WARNING
                        }
                    }
                    for (let atividade of diretor.atividade) {
                        let diretorAtividade = {
                            "id_diretor": diretor.id,
                            "id_atividade": atividade.id
                        }
                        let resultDiretorAtividade = await controllerDiretorAtividade.inserirNovoDiretorAtividade(diretorAtividade)
                        if (!resultDiretorAtividade.status) {
                            return customMessage.SUCCESS_CREATED_ITEM_WARNING
                        }
                    } for (let filme of diretor.filme) {
                        let diretorFilme = {
                            "id_filme": filme.id,
                            "id_diretor": diretor.id
                        }
                        let resultDiretorFilme = await controllerFilmeDiretor.inserirNovoFilmeDiretor(diretorFilme)
                        if (!resultDiretorFilme.status) {
                            return customMessage.SUCCESS_CREATED_ITEM_WARNING
                        }
                    }

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = diretor
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

const atualizarDiretor = async function (diretor, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let resultBuscarDiretor = await buscarDiretor(id)
            if (resultBuscarDiretor.status) {
                let validar = await validarDados(diretor)
                if (!validar) {
                    diretor.id = Number(id)
                    let result = await diretorDAO.updateDiretor((diretor))

                    if (result) {
                        let resultDeleteFotos = await controllerDiretorFoto.excluirFotosIdDiretor(diretor.id)
                        if (resultDeleteFotos.status) {
                            for (let itemDiretor of diretor.foto) {
                                let fotoDiretor = {
                                    "id_diretor": diretor.id,
                                    "id_foto": itemDiretor.id
                                }

                                let resultDiretorFoto = await controllerDiretorFoto.inserirNovoDiretorFoto(fotoDiretor)
                                if (!resultDiretorFoto.status) {
                                    return customMessage.SUCCESS_CREATED_ITEM_WARNING
                                }
                            }
                            let resultDeleteNacionalidades = await controllerDiretorNacionalidade.excluirNacionalidadeIdDiretor(diretor.id)
                            if (resultDeleteNacionalidades.status) {
                                for (let itemDiretor of diretor.nacionalidade) {
                                    let nacionalidadeDiretor = {
                                        "id_diretor": diretor.id,
                                        "id_nacionalidade": itemDiretor.id
                                    }
                                    let resultDiretorNacionalidade = await controllerDiretorNacionalidade.inserirNovoDiretorNacionalidade(nacionalidadeDiretor)
                                    if (!resultDiretorNacionalidade.status) {
                                        return customMessage.SUCCESS_CREATED_ITEM_WARNING
                                    }
                                }
                            }
                            let resultDeleteAtividades = await controllerDiretorAtividade.excluirAtividadeIdDiretor(diretor.id)
                            if (resultDeleteAtividades.status) {
                                for (let itemDiretor of diretor.atividade) {
                                    let atividadeDiretor = {
                                        "id_diretor": diretor.id,
                                        "id_atividade": itemDiretor.id
                                    }
                                    let resultDiretorAtividade = await controllerDiretorAtividade.inserirNovoDiretorAtividade(atividadeDiretor)
                                    if (!resultDiretorAtividade.status) {
                                        return customMessage.SUCCESS_CREATED_ITEM_WARNING
                                    }
                                }
                            }
                        }
                        let resultDeleteFilmes = await controllerFilmeDiretor.excluirFilmeIdDiretor(diretor.id)
                        if (resultDeleteFilmes.status) {
                            for (let itemDiretor of diretor.filme) {
                                let diretorFilme = {
                                    "id_filme": itemDiretor.id,
                                    "id_diretor": diretor.id
                                }
                                let resultDiretorFilme = await controllerFilmeDiretor.inserirNovoFilmeDiretor(diretorFilme)
                                if (!resultDiretorFilme.status) {
                                    return customMessage.SUCCESS_CREATED_ITEM_WARNING
                                }
                            }
                        }

                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATE_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATE_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATE_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = diretor

                        return customMessage.DEFAULT_MESSAGE //200
                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return validar
                }
            } else {
                return resultBuscarDiretor
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const listarDiretor = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let result = await diretorDAO.selectAllDiretor()
        if (result) {
            if (result.length > 0) {
                for (let diretor of result) {
                    let resultSexo = await controllerSexo.buscarSexo(diretor.id_sexo)
                    if (resultSexo.status) {
                        diretor.sexo = resultSexo.response.sexo
                        delete diretor.id_sexo
                    }

                    let resultFotos = await controllerDiretorFoto.buscarFotosIdDiretor(diretor.id)
                    if (resultFotos.status) {
                        diretor.foto = []
                        for (let foto of resultFotos.response.fotos_diretor) {
                            let dadosFoto = await controllerFoto.buscarFoto(foto.id)
                            if (dadosFoto.status) {
                                diretor.foto = diretor.foto.concat(dadosFoto.response.foto)
                            }
                        }
                    }
                    let resultNacionalidades = await controllerDiretorNacionalidade.buscarNacionalidadeIdDiretor(diretor.id)
                    if (resultNacionalidades.status) {
                        diretor.nacionalidade = resultNacionalidades.response.nacionalidades_diretor
                    }
                    let resultAtividade = await controllerDiretorAtividade.buscarAtividadeIdDiretor(diretor.id)
                    if (resultAtividade.status) {
                        diretor.atividade = resultAtividade.response.atividades_diretor
                    }
                    let resultFilmes = await controllerFilmeDiretor.buscarFilmesIdDiretor(diretor.id)
                    if (resultFilmes.status) {
                        diretor.filme = resultFilmes.response.filme_diretor
                    }
                }
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.diretor = result

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
const buscarDiretor = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'

            return customMessage.ERROR_BAD_REQUEST //400
        } else {
            let result = await diretorDAO.selectByIdDiretor(id)

            if (result) {
                if (result.length > 0) {
                    for (let diretor of result) {
                        let resultSexo = await controllerSexo.buscarSexo(diretor.id_sexo)
                        if (resultSexo.status) {
                            diretor.sexo = resultSexo.response.sexo
                            delete diretor.id_sexo
                        }

                        let resultDiretorFoto = await controllerDiretorFoto.buscarFotosIdDiretor(diretor.id)
                        if (resultDiretorFoto.status) {
                            diretor.foto = resultDiretorFoto.response.fotos_diretor
                        }

                        let resultDiretorNacionalidade = await controllerDiretorNacionalidade.buscarNacionalidadeIdDiretor(diretor.id)
                        if (resultDiretorNacionalidade.status) {
                            diretor.nacionalidade = resultDiretorNacionalidade.response.nacionalidades_diretor
                        }

                        let resultDiretorAtividade = await controllerDiretorAtividade.buscarAtividadeIdDiretor(diretor.id)
                        if (resultDiretorAtividade.status) {
                            diretor.atividade = resultDiretorAtividade.response.atividades_diretor
                        }
                        let resultFilmes = await controllerFilmeDiretor.buscarFilmesIdDiretor(diretor.id)
                        if (resultFilmes.status) {
                            diretor.filme = resultFilmes.response.filme_diretor
                        }
                    }
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.diretor = result

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
const excluirDiretor = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))
    try {
        let buscarDiretorResult = await buscarDiretor(id)

        if (buscarDiretorResult.status) {
            let result = await diretorDAO.deleteDiretor(id)

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
            return buscarDiretorResult
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const validarDados = async function (diretor) {
    let customMessage = JSON.parse(JSON.stringify(configMessage))

    if (diretor.nome == undefined || diretor.nome == "" || diretor.nome == null || diretor.nome.length > 100) {
        customMessage.ERROR_BAD_REQUEST.field = "[NOME] INVÁLIDO"
    } else if (diretor.data_nascimento == undefined || diretor.data_nascimento == "" || diretor.data_nascimento == null || isNaN(diretor.data_nascimento) || diretor.data_nascimento.length != 10) {
        customMessage.ERROR_BAD_REQUEST.field = "[DATA_NASCIMENTO] INVÁLIDO"
    } else if (diretor.ano_inicio_carreira == undefined || diretor.ano_inicio_carreira == "" || diretor.ano_inicio_carreira == null || isNaN(diretor.ano_inicio_carreira) || diretor.ano_inicio_carreira.length != 4) {
        customMessage.ERROR_BAD_REQUEST.field = "[ANO INÍCIO CARREIRA] INVÁLIDO"
    } else if (diretor.id_sexo == undefined || diretor.id_sexo == "" || diretor.id_sexo == null || isNaN(diretor.id_sexo) || diretor.id_sexo <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = "[ID_SEXO] INVÁLIDO"
    } else {
        return false
    }

}

module.exports = {
    inserirNovoDiretor,
    atualizarDiretor,
    listarDiretor,
    buscarDiretor,
    excluirDiretor,
}