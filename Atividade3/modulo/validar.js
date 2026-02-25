/**********************************************************
 * Objetivo: Arquivo responsável pelas validações de dados
 * Data: 25/02/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 *********************************************************/

//Função para validar entradas de strings
const validarEntradaDeStrings = function (dado) {
    let dadoInf = String(dado)
    if (dado.trim() === "" || !isNaN(dado))
        return false
    else
        return true
}

//Funçõ para validar entradas de numeros
const validarEntradaDeNumeros = function (valor) {
    if (valor.trim() === "" || isNaN(valor))
        return false
    else
        return true
}


module.exports = {
    validarEntradaDeStrings,
    validarEntradaDeNumeros
}