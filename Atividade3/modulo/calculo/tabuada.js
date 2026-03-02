const { calcular } = require("../../../aula4/modulo/calculo")

/**********************************************************
 * Objetivo: Arquivo responsável pelo cálculo de tabuada
 * Data: 28/02/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***********************************************************/
const gerarTabuada = function (tabuadaInicial, tabuadaFinal, numeroInicial, numeroFinal) {
    let tabI = Number(tabuadaInicial)
    let tabF = Number(tabuadaFinal)
    let nI = Number(numeroInicial)
    let nF = Number(numeroFinal)

    for (let i = tabI; i <= tabF; i++) {
        let resultado = `Tabuada do ${i}\n`

        for (let j = nI; j <= nF; j++) {
            resultado += `${i} x ${j} = ${i * j}\n`
        }

        console.log(resultado)
    }
    return resultado
}

gerarTabuada(1, 5, 1, 10)
