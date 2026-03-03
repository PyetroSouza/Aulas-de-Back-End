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

    return pesoPessoa / (alturaPessoa * alturaPessoa)
}

const classificarImc = function (imc) {

    if (imc < 18.5)
        return 'Abaixo do peso'

    else if (imc >= 18.5 && imc <= 24.9)
        return 'Peso normal'

    else if (imc >= 25 && imc <= 29.9)
        return 'Sobrepeso'

    else if (imc >= 30 && imc <= 34.9)
        return 'Obesidade I'

    else if (imc >= 35 && imc <= 39.9)
        return 'Obesidade II'

    else
        return 'Obesidade III'
}

module.exports = {
    calcularImc,
    classificarImc
}