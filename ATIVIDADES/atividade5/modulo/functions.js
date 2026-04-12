/****************************************************************************************
 * Objetivo: Arquivo responsável pelas funções de busca ao arquivo de contato do Whatsapp
 * Data: 08/04/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ****************************************************************************************/

let arquivo = require("./contatos")
const contatos = arquivo.contatos["whats-users"]

const getDadosUsuarios = function () {
    return { contatos }
}

const getDadosProfileUsuario = function (numero) {
    let dados = {}
    let numeroUsuario = String(numero)
    for (let telefone of contatos) {
        if (telefone.number == numeroUsuario) {
            dados.nome = telefone.account
            dados.nickname = telefone.nickname
            dados.foto = telefone["profile-image"]
            dados.background = telefone.background
            dados.dados_conta = {
                "início": telefone["created-since"].start,
                "encerramento": telefone["created-since"].end
            }
            return dados
        }
    }
    return false

}

const getDadosCadaUsuario = function (numero) {
    let dados = {
        "contatos": []
    }

    let numeroUsuario = String(numero)

    for (let telefone of contatos) {
        if (telefone.number == numeroUsuario) {
            telefone.contacts.forEach(function (itemContato) {
                dados.contatos.push({
                    "nome": itemContato.name,
                    "foto": itemContato.image,
                    "descricao": itemContato.description
                })
            })
        }
    }
    if (dados.contatos.length == 0)
        return false

    return dados
}

const getMensagensUsuario = function (numero) {
    let dados = {
        "contatos": false
    }
    let numeroUsuario = String(numero)

    for (let telefone of contatos) {
        if (telefone.number == numeroUsuario) {
            dados.contatos = telefone.contacts
        }
    }

    if (dados.contatos.length == 0)
        return false

    return dados
}

const getConversaUsuarioContato = function (numero, Usuariocontato) {
    let dados = {
        "nome": false,
        "contato": numero,
    }
    let numeroUsuario = String(numero)

    for (let telefone of contatos) {

        if (telefone.number == numeroUsuario) {
            telefone.contacts.forEach(function (itemContato) {
                if (itemContato.name == String(Usuariocontato)) {
                    dados.nome = itemContato.name
                    dados.mensagens = []

                    itemContato.messages.forEach(function (itemMensagem) {
                        dados.mensagens.push({
                            "remetente": itemMensagem.sender,
                            "conteudo": itemMensagem.content,
                            "tempo": itemMensagem.time
                        })
                    })
                }
            })
        }
    }

    if (!dados.nome)
        return false

    return dados
}

const getFiltroPalavraChave = function (numero, nomeContato, palavra) {

    let numeroUsuario = String(numero)
    let resultado = []
    let termo

    if (palavra) {
        termo = palavra.toLowerCase().trim();
    } else {
        termo = "";
    }

    contatos.forEach(function (usuario) {

        if (usuario.number == numeroUsuario) {
            usuario.contacts.forEach(function (contato) {

                if (contato.name == nomeContato) {
                    contato.messages.forEach(function (msg) {

                        if (termo == "" || msg.content.toLowerCase().includes(termo)) {
                            resultado.push({
                                remetente: msg.sender,
                                conteudo: msg.content,
                                tempo: msg.time
                            })
                        }
                    })
                }
            })
        }
    })

    if (resultado.length == 0)
        return false

    return resultado
}

module.exports = {
    getDadosUsuarios,
    getDadosProfileUsuario,
    getDadosCadaUsuario,
    getMensagensUsuario,
    getConversaUsuarioContato,
    getFiltroPalavraChave
}