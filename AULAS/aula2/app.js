/**************************************************** 
 * Objetivo: Projeto para realizar o cálculo de médias escolares
 * Autor: Pyetro Souza
 * Data: 29/01/2026
 * Versão: 1.0
 * **************************************************/

/* 
    Tipos de criação de variáveis

    var -> Permite criar um espaço em memória do tipo variável.
            Essa forma de criação hoje é considerada mias antiga, não sendo utilizada em projetos mais novos, 
            é provável que seja encontrada apenas em projetos mais antigos.
            Dica: caso você precise utilizar o var, recomenda-se 
            que seja utiliado apenas em escopo global (criado começo do projeto, e precisa para o todo projetos, em funções principalmente)
            Escobo local: apenas dentro do bloco.

    let -> Permite criar um espaço em mémoria do tipo váriavel. 
            Essa forma de criação é realizada somente no escobo LOCAL,
            Ou seja, dentro de bloco de programação { } - ex: if, função
            Este tipo de váriavel deixa de existir ao término do bloco.

    const -> Permite criar um espaço em memória do tipo constante, 
            Ou seja, esse conteúdo não poderá sofrer mudanças durante 
            o Projeto.
            Dica: Se possível você pode criar essa const escrita em MAIÚSCULO, para
            facilitar a sua utilização. Pode ser criada de forma local ou global.


    Operadores de comparação
     
    == -> Permite a comparação de dois conteúdos
    != -> Permite comparar a diferença de dois conteúdos
    < -> Permite validar o valor menor
    > -> Permite validar o valor maior
    <= -> Permite validar se o valor é menor ou igual
    >= -> Permite validar se o valor é maior ou igual
    === -> Permite a comparação de igualdade dos conteúdos e a igualdade da tipagem de dados
    !== ->  Permite a comparação a diferença de conteúdos e a igualdade de tipagem de dados
    ==! -> Permite comparar a igualdade de conteúdos e a 
            diferença de tipagem de dados  

    Tipos de operadores lógicos
    E -> AND -> &&
    OU -> OR -> ||
    NAO -> NOT -> !

    Formas de conversão de tipos de dados
        parseInt() -> Permite converter um conteúdo em um número do tipo inteiro
        parseFloat -> Permite converter um conteúdo em um número do tipo decimal
        Number -> Permite converter um conteúdo para NUMERO, podendo ser inteiro ou decimal
        String() - Permite converter um conteúdo em STRING
        Boolean() - Permite converter um conteúdo para BOOLEANO (true ou false)   
        
        typeof() -> retorna o tipo de dados de uma variável (String, Number, Bolean ou Object)

*/

//Import da biblioteca de entrada de dados
const readline = require('readline')
const { isDataView } = require('util/types')

// Criação do objeto para captar as entradas de objetos 
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//Entrada de dados do nome
entradaDeDados.question('Digite o nome do aluno: ', function (nome) {
    //Recebe o nome do Aluno
    let nomeAluno = nome
    if (nome == "" || !isNaN(nome)) {
        console.log('[ERRO] Coloque o nome válido')
        return
    }

    //Entrada de dados da nota1
    entradaDeDados.question('Digite a nota1: ', function (valor1) {
        let nota1 = valor1

        //Entrada de dados da nota2
        entradaDeDados.question('Digite a nota2: ', function (valor2) {
            let nota2 = valor2

            //Entrada de dados da nota3
            entradaDeDados.question('Digite a nota3: ', function (valor3) {
                let nota3 = valor3

                //Entrada de dados da nota4
                entradaDeDados.question('Digite a nota4: ', function (valor4) {
                    let nota4 = valor4

                    let calcular = require('./modulo/calculo')
                    let media = calcular.calcularMedia(nota1, nota2, nota3, nota4)
                    let status = calcular.validarStatus(media)
                    // let status = validarStatus(media)
                    // console.log(status)
                    //Exibir o boletim do Aluno
                    //toFixed() -> É um método que permite fixar a qtde de casas decimais
                    if (nomeAluno, media, status) {
                        console.log(` A média do(a) aluno(a), ${nomeAluno}, é ${media}, \n ${status}`)
                        entradaDeDados.close
                    } else {
                        console.log('[ERRO]: Não foi possível processar o cálculo')
                        entradaDeDados.close
                    }


                }) //Fecha nota4
            }) //Fecha nota3
        }) //Fecha nota2
    }) //Fecha nota1
}) //Fecha nome 

