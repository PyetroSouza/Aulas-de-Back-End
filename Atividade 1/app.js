/**************************************************** 
 * Objetivo: Projeto para realizar o cálculo de médias escolares
 * Autor: Pyetro Souza
 * Data: 04/02/2026
 * Versão: 1.0
 * **************************************************/

//Import da biblioteca de entrada de dados
const readline = require('readline')

// Criação do objeto para captar as entradas de objetos 
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

entradaDeDados.question('Olá, somos a empresa VIVA MODA, BEM VINDO! \n Digite o nome do cliente: ', function (nome) {
    let nomeComprador = nome
    if (nome == '') {
        console.log('[ERRO] Digite o nome do cliente')
        return
    } else if (!isNaN(nome)) {
        console.log('[ERRO] Apenas caracteres válidos')
        return
    }
    entradaDeDados.question('Digite o nome do produto: ', function (produto) {
        let nomeProduto = produto
        if (produto == '') {
            console.log('[ERRO] Digite o nome do produto')
            return
        } else if (!isNaN(produto)) {
            console.log('[ERRO] Apenas caracteres válidos')
            return
        }
        entradaDeDados.question('Digite o valor da compra: ', function (valor) {
        if (valor == '') {
            console.log('[ERRO] Digite o valor da compra')
            return
        }
        let valorProduto = Number(valor)
        if (isNaN(valorProduto)) {
            console.log('[ERRO] Apenas números permitidos')
            return
        }
            entradaDeDados.question('Digite a taxa de juros ( coloque sem o símbolo de porcentagem (%) ): ', function (taxa) {
                let taxaJuros = Number(taxa) / 100
                if (isNaN(Number(taxa))) {
                    console.log('[ERRO] Apenas números permitidos')
                    return
                } else if (taxa == '') {
                    console.log('[ERRO] Digite a taxa de juros do produto')
                    return
                }
                entradaDeDados.question('A forma de pagamento será em anos ou meses? \n Digite [1] se será em meses \n Digite [2] se será em anos: \n ', function (tempo) {
                    let tempoEscolhido = Number(tempo)
                    if (isNaN(tempo)) {
                        console.log('[ERRO] Apenas números permitidos')
                        return
                    } else if (tempo == '') {
                        console.log('[ERRO] Digite a forma de pagamento')
                        return
                    } else if (tempo > 2 || tempo < 1) {
                        console.log('[ERRO] Digite apenas valores [1] para meses ou [2] para anos')
                        return
                    }
                    entradaDeDados.question('Será pago em quantas vezes o produto?: ', function (vezes) {
                        let vezesParceladas = Number(vezes)
                        if (tempoEscolhido == 2) {
                            vezesParceladas = vezes * 12
                        } if (isNaN(Number(vezes))) {
                            console.log('[ERRO] Apenas números permitidos')
                            return
                        } else if (vezes == '') {
                            console.log('[ERRO] Digite quantas vezes será pago o produto')
                            return
                        } else {

                            let montante = valorProduto * (1 + taxaJuros) ** vezesParceladas
                            let diferencaValor = montante - valorProduto

                            console.log(`\n *************************** VIVA MODA ***************************\n`)
                            console.log(` Muito obrigado por realizar a sua compra conosco Sr(a) ${nomeComprador}.`)
                            console.log(`A compra do produto ${nomeProduto}, tem um valor de: ${valorProduto.toFixed(2)}.`)
                            console.log(`A sua compra será parcelada em ${vezesParceladas} vezes e o Sr(a) pagará: ${montante.toFixed(2)}.`)
                            console.log(`O acréscimo realizado ao valor de: ${valorProduto.toFixed(2)} será de ${diferencaValor.toFixed(2)}.\n`)
                            console.log(`Muito obrigado por escolher a VIVA MODA`)
                            console.log('******************************************************************')
                        }
                    })

                })
            })
        })
})
})