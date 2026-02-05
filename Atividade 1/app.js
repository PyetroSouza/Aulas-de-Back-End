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

//Entrada de Dados do nome do cliente
entradaDeDados.question('Olá, somos a empresa VIVA MODA, BEM VINDO! \n Digite o nome do cliente: ', function (nome) {
    //Recebe o nome do cliente
    let nomeComprador = nome

    //Validação de entrada vazia
    if (nome == '') {
        console.log('[ERRO] Digite o nome do cliente')
        return

        //Validação de entrada com números
    } else if (!isNaN(nome)) {
        console.log('[ERRO] Apenas caracteres válidos')
        return
    }

    //Entrada de Dados do nome do produto
    entradaDeDados.question('Digite o nome do produto: ', function (produto) {
        //Recebe o nome do produto
        let nomeProduto = produto

        //Validação de entrada vazia
        if (produto == '') {
            console.log('[ERRO] Digite o nome do produto')
            return

            //Validação de entrada de números
        } else if (!isNaN(produto)) {
            console.log('[ERRO] Apenas caracteres válidos')
            return
        }

        //Entrada de Dados do valor da compra
        entradaDeDados.question('Digite o valor da compra: ', function (valor) {
            //Recebe o valor do produto
             let valorProduto = Number(valor)

            //Validação de entrada vazia
            if (valor == '') {
                console.log('[ERRO] Digite o valor da compra')
                return
            }

            //Validação de entrada de caracteres
            if (isNaN(valorProduto)) {
                console.log('[ERRO] Apenas números permitidos')
                return
            }

            //Entrada de Dados da taxa de juros 
            entradaDeDados.question('Digite a taxa de juros ( coloque sem o símbolo de porcentagem (%) ): ', function (taxa) {
                //Recebe a taxa de juros

                let taxaJuros = Number(taxa) / 100
                //Validação de entrada de caracteres

                if (isNaN(Number(taxa))) {
                    console.log('[ERRO] Apenas números permitidos')
                    return

                    //Validação de entrada vazia
                } else if (taxa == '') {
                    console.log('[ERRO] Digite a taxa de juros do produto')
                    return
                }

                //Entrada de Dados do tempo de pagamento de anos ou meses
                entradaDeDados.question('A forma de pagamento será em anos ou meses? \n Digite [1] se será em meses \n Digite [2] se será em anos: \n ', function (tempo) {
                    //Recebe o tempo escolhido de pagamento 
                    let tempoEscolhido = Number(tempo)

                    //Validação de entrada de caracteres
                    if (isNaN(tempo)) {
                        console.log('[ERRO] Apenas números permitidos')
                        return

                        //Validação de entrada vazia
                    } else if (tempo == '') {
                        console.log('[ERRO] Digite a forma de pagamento')
                        return

                        //Validação de entrada de números que não seja [1] ou [2]
                    } else if (tempo > 2 || tempo < 1) {
                        console.log('[ERRO] Digite apenas valores [1] para meses ou [2] para anos')
                        return
                    }
                    
                    //Entrada de Dados de quantas vezes será pagos o produto
                    entradaDeDados.question('Será pago em quantas vezes o produto?: ', function (vezes) {
                        //Recebe o quanto de vezes será pago o produto
                        let quantidadesParcelas = Number(vezes)

                        //Entrada de Dados caso o tempo escolhido seja em ano, para ser convertido para meses
                        if (tempoEscolhido == 2) {
                            quantidadesParcelas = vezes * 12

                            //Validação de entrada de caracteres
                        } if (isNaN(Number(vezes))) {
                            console.log('[ERRO] Apenas números permitidos')
                            return

                            //Validação de entrada vazia
                        } else if (vezes == '') {
                            console.log('[ERRO] Digite quantas vezes será pago o produto')
                            return
                        } else {

                            //Cálculo do montante
                            let montante = valorProduto * (1 + taxaJuros) ** quantidadesParcelas

                            //Cálculo da diferença entre o montante e o valor do produto
                            let diferencaValor = montante - valorProduto

                            console.log(`\n *************************** VIVA MODA ***************************\n`)
                            console.log(` Muito obrigado por realizar a sua compra conosco Sr(a) ${nomeComprador}.`)
                            console.log(`A compra do produto ${nomeProduto}, tem um valor de: R$${valorProduto.toFixed(2)}.`)
                            console.log(`A sua compra será parcelada em ${quantidadesParcelas} vezes e o Sr(a) pagará: R$${montante.toFixed(2)}.`)
                            console.log(`O acréscimo realizado ao valor de: R$${valorProduto.toFixed(2)} será de ${diferencaValor.toFixed(2)}.\n`)
                            console.log(`Muito obrigado por escolher a VIVA MODA`)
                            console.log('******************************************************************')
                        }
                    })

                })
            })
        })
    })
})