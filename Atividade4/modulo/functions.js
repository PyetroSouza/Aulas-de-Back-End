/***************************************
 * Objetivo: 
 * Data: 18/03/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***************************************/
let arquivo = require("./aquivo")


const getListaDeEstados = function () {
    let uf = []
    arquivo.listaDeEstados.estados.forEach(function (itemLista) {
        uf.push(itemLista.sigla)
    })
    let quantidade = uf.length
    let lista = {uf, quantidade}
    return lista
}
const getDadosEstados = function (){

}

getListaDeEstados()