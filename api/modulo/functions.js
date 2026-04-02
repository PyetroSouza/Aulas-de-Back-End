/***************************************
 * Objetivo: Arquivo responsável pelas funções de busca ao arquivo de informações dos estados do Brasil
 * Data: 18/03/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***************************************/
let arquivo = require("./arquivo")
const estados = arquivo.listaDeEstados.estados


const getListaDeEstados = function () {
    let uf = []
    estados.forEach(function (itemLista) {
        uf.push(itemLista.sigla)
    })
    let quantidade = uf.length
    let lista = { uf, quantidade }

    return lista
}

const getDadosEstados = function (siglaEstado) {
    let sigla = String(siglaEstado).toUpperCase()
    for (let estado of estados) {
        if (estado.sigla == sigla) {
            return {
                "uf": estado.sigla,
                "descricao": estado.nome,
                "capital": estado.capital,
                "regiao": estado.regiao
            }
        }
    }
    return false

}

const getCapitalEstado = function (capitalEstado) {
    let sigla = String(capitalEstado).toUpperCase()
    for (let estado of estados) {
        if (estado.sigla == sigla) {
            return { "uf": estado.sigla, "descricao": estado.nome, "capital": estado.capital }
        }
    }
    return false
}

const getEstadosRegiao = function (regiaoEstado) {
    let regiao = String(regiaoEstado).toUpperCase()
    let lista = {
        "regiao": regiao,
        "estados": []
    }
    for (let estado of estados) {
        if (estado.regiao.toUpperCase() === regiao) {
            lista.estados.push({
                "uf": estado.sigla,
                "descricao": estado.nome
            })
        }

    }
    if (lista.estados == 0) {
        return false
    }
    return lista
}

const getCapitalPais = function () {
    let capitais = []
    let lista = {
        capitais
    }

    estados.forEach(function (estado) {
        if (estado.capital_pais) {
            capitais.push({
                "capital_atual": estado.capital_pais.capital,
                "uf": estado.sigla,
                "descricao": estado.nome,
                "capital": estado.capital,
                "regiao": estado.regiao,
                "capital_pais_ano_inicio": estado.capital_pais.ano_inicio,
                "capital_pais_ano_termino": estado.capital_pais.ano_fim
            })
        }
    })
    return lista


}

const getCidades = function (siglaEstado) {
    let sigla = String(siglaEstado).toUpperCase()
    let lista = {
        "uf": sigla,
        "descricao": false,
        "quantidade": false,
        "cidades": []
    }

    for (let estado of estados) {
        if (estado.sigla === sigla) {
            lista.descricao = estado.nome
            estado.cidades.forEach(function (itemCidade) {
                lista.cidades.push(itemCidade.nome)
            })
        }
    }
    lista.quantidade = lista.cidades.length

    if (lista.cidades.length == 0)
        return false
    return lista

}

module.exports = {
    getListaDeEstados,
    getDadosEstados,
    getCapitalEstado,
    getCapitalPais,
    getEstadosRegiao,
    getCidades
}