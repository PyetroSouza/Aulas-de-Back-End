/*************************************************************
 * Objetivo: Criar uma aplicação que realiza calculos de Juros utilizando funções para modularizar o código
 * Autor: Pyetro Souza
 * Data: 11/02/2026
 * Versão: 1.0
 *************************************************************/

//Import da biblioteca do readline
const readline = require('readline')

//Criar o objeto de entrada de dados
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//Entrada do nome do cliente
entradaDeDados.question('Digite o seu nome do Cliente: ', function (nome) {
    let nomeCliente = nome

    //Entrada do nome do produot
    entradaDeDados.question('Digite o nome do produto: ', function (produto) {
        let nomeProduto = produto

        //Entrada do valor da compra
        entradaDeDados.question('Difite o valor da compra: ', function (valor) {
            let valorCompra = valor

            //Entrada da taxa de juros
            entradaDeDados.question('Digite a taxa de juros: ', function (taxa) {
                let taxaJuros = taxa

                //Entrada da quantidade de parcelas
                entradaDeDados.question('Digite a quantidade de parcelas: ', function (parcelas) {
                    let qtdeParcelas = parcelas

                    //Validações 

                    //Cálculos
                    let percentual = Number(taxaJuros) / 100

                    let montante = valorCompra * ((1 + percentual) ** qtdeParcelas)

                    console.log(`o valor final é: ${montante.toFixed(2)}`)
                })
            })
        })
    })
})

