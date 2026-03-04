/**********************************************************
 * Objetivo: Arquivo responsável pelo cálculo de par ou ímpars
 * Data: 28/02/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***********************************************************/

const calcularParOuImpar = function (numero1, numero2, tipoCalculo) {

    let numInicial = Number(numero1)
    let numFinal = Number(numero2)
    let tpCal = String(tipoCalculo)

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
    let resultadoFinal = ""

if (tpCal === "PAR") {

    resultadoFinal =
        "Lista de números Pares\n" +
        listaPares +
        "\nQtde de números encontrados: " + qtdPares

} else if (tpCal === "IMPAR") {

    resultadoFinal =
        "Lista de números Ímpares\n" +
        listaImpares +
        "\nQtde de números encontrados: " + qtdImpares

} else if (tpCal === "AMBOS") {

    resultadoFinal =
        "Lista de números Pares\n" +
        listaPares +
        "\nQtde de números encontrados: " + qtdPares + "\n\n" +
        "Lista de números Ímpares\n" +
        listaImpares +
        "\nQtde de números encontrados: " + qtdImpares
}

return resultadoFinal
     
}

module.exports = {
    calcularParOuImpar
}

