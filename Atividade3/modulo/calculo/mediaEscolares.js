/**********************************************************
 * Objetivo: Arquivo responsável pelo cálculo da média escolar
 * Data: 28/02/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***********************************************************/

const calcularMedia = function (nota1, nota2, nota3, nota4) {

    let media = (
        Number(nota1) +
        Number(nota2) +
        Number(nota3) +
        Number(nota4)
    ) / 4

    return Number(media.toFixed(2))
}

const calcularMediaExame = function (media, notaExame) {

    let mediaFinal = (Number(media) + Number(notaExame)) / 2
    return Number(mediaFinal.toFixed(2))
}

const classificarMedia = function (media) {

    if (media >= 70)
        return 'Aprovado'
    else if (media < 50)
        return 'Reprovado'
    else
        return 'Exame'
}

module.exports = {
    calcularMedia,
    calcularMediaExame,
    classificarMedia
}