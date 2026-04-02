/**********************************************************
 * Objetivo: Arquivo responsável pelo cálculo de IMC
 * Data: 28/02/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***********************************************************/

//Função para calcular IMC, recebendo peso e altura
const calcularImc = function (peso, altura, unidadeMedida) {
    let pesoPessoa = Number(peso)
    let alturaPessoa = Number(altura)
    let medida = unidadeMedida
    let imc 

    if (medida === "CM")
        alturaPessoa = alturaPessoa / 100
    else if (medida !== "M"){
        return false
    }
   imc = (pesoPessoa / (alturaPessoa) ** 2).toFixed(2)
   return imc
}

const classificarImc = function (imc) {
    let imcClassic = imc
    let classificarImc = ""
    if (imcClassic < 18.5)
        classificarImc = 'Abaixo do peso'

    else if (imcClassic >= 18.5 && imcClassic <= 24.9)
        classificarImc = 'Peso normal'

    else if (imcClassic >= 25 && imcClassic <= 29.9)
        classificarImc = 'Sobrepeso'

    else if (imcClassic >= 30 && imcClassic <= 34.9)
        classificarImc =  'Obesidade I'

    else if (imcClassic >= 35 && imcClassic <= 39.9)
        classificarImc = 'Obesidade II'

    else if (imcClassic > 40)
        classificarImc = 'Obesidade III'
    else {
        return false
    } return classificarImc
}

module.exports = {
    calcularImc,
    classificarImc,
}