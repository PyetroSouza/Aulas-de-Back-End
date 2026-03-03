/****************************************************************
 * Objetivo: Desenvolver uma aplicação para a empresa Cálculos SA
 * Autor: Pyetro Souza
 * Data: 02/02/2026
 * Versão: 2.0
 * ****************************************************************/

//Import da biblioteca de entrada de dados
const readline = require('readline')

// Criação do objeto para captar as entradas de objetos 
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//Import dos arquivos de calculos e validação
let calculoImc = require('./modulo/calculo/imc')
let calculoMediaEscolar = require('./modulo/calculo/mediaEscolares')
let calculoTabuada = require('./modulo/calculo/tabuada')
let calculoFatorial = require('./modulo/calculo/fatorial')
let calculoParImpar = require('./modulo/calculo/par_impar')
let validacao = require('./modulo/validar')

entradaDeDados.question("'Olá! Seja bem vindo a empresa Cálculo SA \n Qual calculadora você gostaria de usar? \n - IMC \n - Médias Escolares \n - Cálculo de Tabuada \n - Fatorial \n - Par ou Ímpar \n Escreva uma delas que queira usar: ", function (informarCalculo) {

    let escolhaCalculo = informarCalculo.trim().toUpperCase()
    let validarCalculadora = validacao.validarEntradaString(informarCalculo)
    let validarEscolhaCalculadora = validacao.validarCalculadora(informarCalculo)

    if (escolhaCalculo){
        if (escolhaCalculo == "IMC"){
            entradaDeDados.question('\n Digite o seu peso em kilos (kg): ', function(peso){
                let pesoPessoa = peso.replace(',' , ' .')
                let pesoVerificado = validacao.validarEntradaNumber(pesoPessoa)

                if(pesoVerificado)

            })
        }
    }
})