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

<<<<<<< HEAD
gerarTabuada(1, 5, 1, 10)

 module.exports = {
  gerarTabuada  
 }
=======
module.exports = {
 gerarTabuada
}
>>>>>>> e206bf100ab168a68a9dc5ca6b305222684c17d6
