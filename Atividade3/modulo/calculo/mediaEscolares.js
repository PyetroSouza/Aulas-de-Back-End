/**********************************************************
 * Objetivo: Arquivo responsável pelo cálculo da média escolar
 * Data: 28/02/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***********************************************************/
const calcularMedia = function (nota1, nota2, nota3, nota4) {
    n1 = Number(nota1)
    n2 = Number(nota2)
    n3 = Number(nota3)
    n4 = Number(nota4)
    let media = (nota1 + nota2 + nota3 + nota4) / 4
    return media
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
    sxAluno = String(sexoAluno)
    sxProfessor = String(sexoProfessor)
    if (sexoAluno == "masculino")
        sxAluno == "aluno"
    else
        sxAluno == "aluna"
    if (sexoProfessor == 'masculino')
        sxProfessor == "professor"
    else sxProfessor == "professora"
}