/**********************************************************
 * Objetivo: Arquivo responsável pelo cálculo de IMC
 * Data: 28/02/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***********************************************************/


const validarUnidadeMedidaAltura = function (unidadeMedida) {
    let medida = unidadeMedida.toUpperCase()
    if (medida === "CM" || medida === "M") {
        return true
    } else {
        return false
    }
}


//Função para calcular IMC, recebendo peso e altura
const calcularImc = function (peso, altura) {
    let pesoPessoa = Number(peso)
    let alturaPessoa = Number(altura)

        if (medida === 'CM') {
        alturaUsuario = alturaUsuario / 100
    } else if (medida !== "M") {
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
    validarUnidadeMedidaAltura
}