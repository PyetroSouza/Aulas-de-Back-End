function calcularMedia(nota1, nota2, nota3, nota4) {
    let n1 = Number(nota1)
    let n2 = Number(nota2)
    let n3 = Number(nota3)
    let n4 = Number(nota4)
    if (nota1 == '' || nota1 < 0 || nota1 > 100 || isNaN(nota1) ||
        nota2 == '' || nota2 < 0 || nota2 > 100 || isNaN(nota2) ||
        nota3 == '' || nota3 < 0 || nota3 > 100 || isNaN(nota3) ||
        nota4 == '' || nota4 < 0 || nota4 > 100 || isNaN(nota4)) {
        return false
    } else {
        let media = (n1 + n2 + n3 + n4) / 4
        return Number(media.toFixed(2))
    }
}


function validarStatus(media) {
    let status
    if (media >= 70.00) {
        status = "Aprovado"
    } else if (media < 50.00) {
        status = "Reprovado"
    } else {
        status = "Recuperação"
    }
    return status
}


module.exports = {
    calcularMedia,
    validarStatus
}