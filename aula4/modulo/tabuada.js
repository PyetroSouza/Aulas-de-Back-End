/**********************
 * Objetivo: Arquivo responsável por gerar uma tabuada utilizando WHILE e FOR
 * Data: 25/02/26
 * Autor: Pyetro Ferreira
 * Versão 1.0
 */

//IMport da biblioteca de operações matematicos
const calculosMatematicos = require('./calculo')

//Função para imprimir a tabuada 
const gerarTabuadaWhile = function(tabuada){
    let tab = Number(tabuada)
    let cont = 0
    let resultado 
    while (cont <= 10){
        resultado = calculosMatematicos.multiplicar(tab, cont)
        console.log(`${tab} x ${cont} = ${resultado}`)

        // cont = cont +1
        // cont++
        cont +=1
    }

}
const gerarTabuadaFor = function(tabuada){
    let tab = Number(tabuada)
    let resultado 
    for(let cont = 0; cont<=10; cont++){
        resultado = calculosMatematicos.multiplicar(tab, cont)
        console.log(`${tab} x ${cont} = ${resultado}`)
    }


}
gerarTabuadaFor(3)