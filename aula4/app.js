/*********************************************************************
 * Objetivo: Arquivo responsável SOMENTE pelas entradas e saídas de dados
 * Data: 20/02/2026
 * Autor: Pyetro Souza
 * Versão: 1.0
 ********************************************************************/

const calcularMatematicos = require('./modulo/calculo.js')

let n1 = '105'
let n2 = 20
let operador = 'somar'


let validar = calcularMatematicos.validarDados(n1, n2, operador)


if (validar) {
    let result = calcularMatematicos.calcular(10, 2, operador)
    if (result)
        console.log(result)
    else
        console.log('ERRO: Não foi possível fazer o calculo')
} else
    console.log('ERRO: Validação de dados incorreta')

