/**********************************************************
 * Objetivo: Arquivo responsável pelo cálculo de IMC
 * Data: 28/02/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***********************************************************/
//Função para calcular IMC, recebendo peso e altura

const calcularImc = function (peso, altura) {
    let pesoPessoa = Number(peso)
    let alturaPessoa = Number(altura)
    let imc = pesoPessoa / (alturaPessoa * alturaPessoa)
    return imc
}

//Função para classificar o IMC, recebendo o imc
const classificarImc = function(imc){
        let classificacao
        if (imc < 18.5)
        classificacao = 'Abaixo do peso'
    else if (imc > 18.5 && imc < 24.9)
        classificacao = 'Peso normal'
    else if (imc > 25 && imc < 29.9)
        console.log('Acima do peso (sobrepeso')
    else if (imc > 30 && imc < 34.9)
        classificacao = 'Obesidade I'
    else if (imc > 35 && imc < 39.9)
        classificacao = 'Obesidade II'
    else if (imc > 40)
        classificacao = 'Obesidade III'
    return classificacao
}
module.exports = {
    calcularImc,
    classificarImc
}