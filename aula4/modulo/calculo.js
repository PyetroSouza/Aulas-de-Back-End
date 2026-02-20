/*********************************************************************
 * Objetivo: Arquivo responsável pelos processamento de calculos matemáticos (SOMAR, SUBTRAIR, MULTIPLICAR E DIVIDIR)
 * Data: 20/02/2026
 * Autor: Pyetro Souza
 * Versão: 1.0
 ********************************************************************/
//toLowerCase()  -> Retorna uma String em minusculo
//toUpperCase() -> Retorna uma String em MAIUSCULO

//Exemplo de função anonima
//Função para calcular as 4 operações matemáticas
const calcular = function (numero1, numero2, operador) {
    //Entrada de dados
    let valor1 = Number(numero1)
    let valor2 = Number(numero2)
    let operadorMatematico = String(operador).toUpperCase()

    let resultado = false

    // //Processamento
    // if (operadorMatematico == 'SOMAR')
    //     resultado = valor1 + valor2
    // else if (operadorMatematico == 'SUBTRAIR')
    //     resultado = valor1 - valor2
    // else if (operadorMatematico == 'MULTIPLICAR')
    //     resultado = valor1 * valor2
    // else if (operadorMatematico == 'DIVIDIR')
    //     resultado = valor1 / valor2


    // //Saída
    // return resultado

    switch (operadorMatematico) {
        case 'SOMAR':
            resultado = valor1 + valor2
            break;
        case 'SUBTRARIR':
            resultado = valor1 - valor2
            break;
        case 'MULTIPLICAR':
            resultado = valor1 * valor2
            break;
        case 'DIVIDIR':
            resultado = valor1 / valor2
            break;
    }

    return resultado


}
//Chamado a função para testar
let result = calcular(1, 10, 'Multiplicar')
if (result)
    console.log(result)
else
    console.log('ERRO')

