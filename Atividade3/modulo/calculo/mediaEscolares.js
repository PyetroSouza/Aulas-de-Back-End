/**********************************************************
 * Objetivo: Arquivo responsável pelo cálculo da média escolar
 * Data: 28/02/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***********************************************************/

const calcularMedia = function (nota1, nota2, nota3, nota4) {

    let n1 = Number(nota1)
    let n2 = Number(nota2)
    let n3 = Number(nota3)
    let n4 = Number(nota4)

    let media = (n1 + n2 + n3 + n4) / 4

    return media.toFixed(2)
}

const calcularMediaExame = function (media, notaExame) {
    let valorMedia = Number(media)
    let ntEx = Numbe(notaExame)
    let mediaFinal
    mediaFinal = (valorMedia + ntEx) / 2
    return mediaFinal
}

const classificarMedia = function (media, notaExame) {
    let status
    if (media >= 70)
        status = 'Aprovado'
    else if (media < 50)
        status = 'Reprovado'
    else if (media >= 50 && media <= 69)
        if (notaExame >= 60)
            status = 'Aprovado'
        else
            status = 'Reprovado'
    return status
}

const classificarSexo = function (sexoAluno, sexoProfessor) {
    let sxAluno = String(sexoAluno)
    let sxProfessor = String(sexoProfessor)
    if (sexoAluno == "masculino")
        sxAluno == "aluno"
    else
        sxAluno == "aluna"
    if (sexoProfessor == 'masculino')
        sxProfessor == "professor"
    else sxProfessor == "professora"

    return sxAluno, sxProfessor
}
module.exports = {
    validarMediaEscolares,
    calcularMedia,
    calcularMediaExame,
    classificarMedia,
    classificarSexo
}