/**********************************
 * Objetivo: Arquivo responsável pelas funções de calculos financeiros 
 * Autor: Pyetro Souza
 * Data: 11/01/2026
 * Versão: 1.1
 * 
 *  */
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
    if (valor == '' || isNaN(valor) || valor <= 0 || parcelas == '' || isNaN(parcelas) || parcelas <= 0) {
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
//Tornando as funções públicas, para que outros arquivos possam utilizar
module.exports = {
    calcularJurosCompostos,
    calcularPercentual
}
