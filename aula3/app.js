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

                    let montante = calcularJurosCompostos(valorCompra, qtdeParcelas, taxaJuros)

                    console.log(montante)
                    // console.log(`o valor final é: ${montante.toFixed(2)}`)


                })
            })
        })
    })
})

//Função para retornar o percentual de um número
function calcularPercentual(numero) {
    //Recebe o numero encaminhado
    let numeroPercentual = Number(numero)

    //Validação caso entrar vazio, numeros menores que zero e strings
    if (numero == "" || numero <= 0 || isNaN(numero)) {
        return false
    } else {
        //Calculo o percentual do número
        let percentual = numeroPercentual / 100

        //Retorna um percentual
        return Number(percentual.toFixed(2))
    }
}

//função para retonar o montante referentes a juros compostos 
function calcularJurosCompostos(valor, taxa, parcelas) {
    //Recebe os valores dos argumentos e converte em número 
    let valorPrincipal = Number(valor)
    let taxaJuros = Number(taxa)
    let qtdeParcelas = Number(parcelas)

    //Validação de vazio ou caracteres
    if (valor == '' || isNaN(valor) || valor <=0 || parcelas == '' || isNaN(parcelas) || parcelas <=0) {
        return false
    } else {


        //Chama a função para retornar o percentual da taxa
        let percentual = calcularPercentual(taxaJuros)
        if (percentual) {
            //Calculo
            let montante = valorPrincipal * ((1 + percentual) ** qtdeParcelas)
            return Number(montante.toFixed(2))
        } else {
            return false
        }
    }
}

