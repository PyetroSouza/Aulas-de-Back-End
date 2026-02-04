/**************************************************** 
 * Objetivo: Projeto para realizar o cálculo de médias escolares
 * Autor: Pyetro Souza
 * Data: 04/02/2026
 * Versão: 1.0
 * **************************************************/

//Import da biblioteca de entrada de dados
const readline = require('readline')
const { isDataView } = require('util/types')

// Criação do objeto para captar as entradas de objetos 
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

entradaDeDados.question('Olá. somos a empresa MODA VIDA, \n Digite o nome do comprador: ', function (nome) {
    let nomeComprador = nome
    if (nome == '') {
        console.log('[ERRO] Digite o nome')
        return entradaDeDados.question
    }
    entradaDeDados.question('Digite o nome do produto: ', function (produto) {
        let nomeProduto = produto
        if (produto == '') {
            console.log('[ERRO] Digite o nome do produto')
            return
        }
        entradaDeDados.question('Digite o valor da compra: ', function (valor) {
            let valorProduto = Number(valor)
            if (isNaN(valor)) {
                console.log('[ERRO] Apenas números permitidos')
                return
            }

            entradaDeDados.question('Digite a taxa de juros: ', function (taxa) {
                let taxaJuros = Number(taxa) / 100
                console.log(taxaJuros)
                if (isNan(taxa)) {
                    console.log('[ERRO] Apenas números permitidos')
                    return
                }

                entradaDeDados.question('A forma de pagamento será em anos [1] ou meses [2]?: ', function (tempo) {
                    let tempoEscolhido = tempo
                    if (isNaN(tempo)) {
                        console.log('[ERRO] Apenas números permitidos')
                        return
                    }

                    entradaDeDados.question('Será pagado em quantas vezes?: ', function (vezes) {
                        let vezesPagamento = Number(vezes)
                        if (tempoEscolhido == 1) {
                            vezesPagamento = vezes * 12
                        } if (isNaN(vezes)) {
                            console.log('[ERRO] Apenas números permitidos')
                            return
                        } else {
                            let montade = valorProduto * (1 + taxaJuros) ** vezesPagamento
                            console.log(montade)
                        }

                    })

                })
            })
        })
    })
})