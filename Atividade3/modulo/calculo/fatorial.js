/**********************************************************
 * Objetivo: Arquivo responsável pelo cálculo de fatorial
 * Data: 02/02/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***********************************************************/
const calcularFatorial = function (numeroFatorial) {
    let num = Number(numeroFatorial)
    let fatorial = 1
    let expressao = ""

    for (let i = num; i >= 1; i--) {
        fatorial *= i
        expressao += i

        if (i > 1) {
            expressao += "x"
        }
    }
    return `Fatorial de ${num} é ${expressao} = ${fatorial}`
}

 module.exports = {
    calcularFatorial
 }