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

                    //Validação de entrada vazia
                    if(nomeAluno == '' || nota1 == '' || nota2 == '' || nota3 =='' || nota4 ==''){
                        console.log("[ERRO] Preencha os campos!")
                        //Validação de entrada de números apenas entre 0 até 100
                    }else if(nota1< 0 || nota1 > 100 || nota2 < 0 || nota2 > 100 || nota3 < 0 || nota3 > 100 || nota4 < 0 || nota4 > 100){
                        console.log("[ERRO] As notas só podem ser 0 a 100")
                        //Validação de entrada somente de números
                        // IsNaN() -> Permite a validação de números ou letras
                    } else if(isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || isNaN(nota4)){
                        console.log('[ERRO] Apenas números permitidos na entrada das notas ')
                    }
                }) //Fecha nota4
            }) //Fecha nota3
        }) //Fecha nota2
    }) //Fecha nota1
}) //Fecha nome 