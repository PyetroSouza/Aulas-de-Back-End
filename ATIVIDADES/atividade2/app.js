/****************************************************************
 * Objetivo: Desenvolver uma aplicação para a empresa Cálculos SA
 * Autor: Pyetro Souza
 * Data: 13/02/2026
 * Versão: 1.0
 * ****************************************************************/

//Import da biblioteca de entrada de dados
const readline = require('readline')

// Criação do objeto para captar as entradas de objetos 
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

entradaDeDados.question('Olá! Seja bem vindo a empresa Cálculo SA \nDigite primeiro número para ser calculado: ',function(numeroPrimeiro){
    let numero1 = numeroPrimeiro

    entradaDeDados.question('Digite o segundo número: ',function(numeroSegundo){
        let numero2 = numeroSegundo

        entradaDeDados.question('Qual operação quer utilizar? \n -Soma \n -Subtração \n -Multiplicação \n -Divisão \nDigite umas das operações: ', function(operacao){
            let operador = operacao

            let calcular = require("./modulo/calculo")
            let calculo = calcular.calcularConta(numero1,numero2,operador)
            console.log(calculo)
            entradaDeDados.close()
        })
    })
})
