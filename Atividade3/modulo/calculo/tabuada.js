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

    let resultadoFinal = ""

    for (let i = tabI; i <= tabF; i++) {

        resultadoFinal += `Tabuada do ${i}\n`

        for (let j = nI; j <= nF; j++) {
            resultadoFinal += `${i} x ${j} = ${i * j}\n`
        }

        resultadoFinal += "\n"
    }

    return resultadoFinal
}

module.exports = {
    gerarTabuada
}
