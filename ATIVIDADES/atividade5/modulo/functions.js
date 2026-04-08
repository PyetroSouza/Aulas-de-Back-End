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
        }
        if (telefone.number != numero)
            return false

        return dados
    }

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
    let dados = {}
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


console.log(getMensagensUsuario("11987876567"))