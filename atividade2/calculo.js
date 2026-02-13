/****************************************************************
 * Objetivo: Desenvolver uma aplicação para a empresa Cálculos SA
 * Autor: Pyetro Souza
 * Data: 13/02/2026
 * Versão: 1.0
 ***************************************************************/

function calcularConta(numero1, numero2, operador) {
    let n1 = Number(numero1.replace(/\./gi, '').replace(/,/gi, '.'))
    let n2 = Number(numero2.replace(/\./g, '').replace(',', '.'))

    if (numero1 == "" || isNaN(n1) || numero2 == "" || isNaN(n2)) {
        console.log('[ERRO] Digite números válidos')
        return false
    }
    if (operador == "" || !isNaN(operador)) {
        console.log('[ERRO] Operador Inválido')
    }
    if (operador == "Divisão" && numero2 == 0) {
        console.log('[ERRO] Não é possível dividir por 0')
        return false
    }

    let resultado

    if (operador == "Soma") {
        resultado = n1 + n2
    } else if (operador == "Subtração") {
        resultado = n1 - n2
    } else if (operador == "Multiplicação") {
        resultado = n1 * n2
    } else if (operador == "Divisão") {
        resultado = n1 / n2
    } else {
        return console.log('[ERRO] Digite apenas umas das opções')
    }
    return Number(resultado.toFixed(2))
}

module.exports = {
    calcularConta
}

