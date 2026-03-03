/**********************************************************
 * Objetivo: Arquivo responsável pelo cálculo de par ou ímpars
 * Data: 28/02/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***********************************************************/

const calcularParOuImpar = function (numero1, numero2) {

    let numInicial = Number(numero1)
    let numFinal = Number(numero2)

    let qtdPares = 0
    let qtdImpares = 0

    let listaPares = ""
    let listaImpares = ""

    for (let i = numInicial; i <= numFinal; i++) {

        if (i % 2 === 0) {
            listaPares += i + "\n"
            qtdPares++
        } else {
            listaImpares += i + "\n"
            qtdImpares++
        }
    }

    let resultadoFinal =
        "Lista de números Pares\n" +
        listaPares +
        "Qtde de números encontrados: " + qtdPares + "\n\n" +
        "Lista de números Impares\n" +
        listaImpares +
        "Qtde de números encontrados: " + qtdImpares

    return resultadoFinal
}

module.exports = {
    calcularParOuImpar
}