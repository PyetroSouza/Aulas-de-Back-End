/***************************************
 * Objetivo: 
 * Data: 18/03/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***************************************/
let arquivo = require("./aquivo")


const getListaDeEstados = function () {
    let uf = []
    let quantidade
    let lista
    arquivo.listaDeEstados.estados.forEach(function (itemLista) {
        uf.push(itemLista.sigla)
    })
    quantidade = uf.length
    lista = { uf, quantidade }
    return lista
}
const getDadosEstados = function (sigla) {
    let nomeEstado = "SP"
    let dados = {}
    arquivo.listaDeEstados.estados.forEach(function (listaDados){
        listaDados.capital
    })


}

getDadosEstados()