/**************************************************************
 * Objetivo: Manipular dados em ARRAY e JSON
 * Data: 05/03/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ************************************************************/

/*
  [] -> representa um objeto do tipo ARRAY
   {} -> representa um objeto do tipo JSON

   ARRAY -> Espaço na memória para armazenar dados sem a necessidade de criar outros objetos 
   Ex: 
        let nome = 'José'
        let nome2 = 'Maria'
        let nome3 = 'João'
        
        indices        0        1        2
        let nomes = ['José', 'Maria', 'João']
    JSON -> É um espaço na memória para armazenar dados com CHAVE e VALOR
    Ex:
        let nome = "José"
        let telefone = "123456789"
        let email = "jose@gmail.com"
                        Atributo        Atributo                Atributo
                        Chave   Valor   Chave       Valor       Chave      Valor
        let cliente = {"nome": "José", "telefone": "123456789", "email": "jose@gmail.com"}
 */

//Criando objetos do tipo ARRAY
const listaDeAlunos = ['José', 'Maria', 'Luiz', 'Antônio', 'Carlos']
const listaDeClientes = []
const listaDeFornecedores = []


const exibirDados = function(){
    //Exibe o objeto ARRAY com o seu conteúdo
    console.log(listaDeAlunos)

    //Exibindo o tipo de dados de um indice 
    console.log(typeof(listaDeAlunos))

    //Exibe o objeto ARRAY em formato de tabela, mostrando indice e conteúdo
    console.table(listaDeAlunos)

    console.log(listaDeAlunos[3])

    console.log(`O nome do aluno é: ${listaDeAlunos[0]}`)
    console.log(`O nome do aluno é: ${listaDeAlunos[1]}`)
    console.log(`O nome do aluno é: ${listaDeAlunos[2]}`)
    console.log(`O nome do aluno é: ${listaDeAlunos[3]}`)
    console.log(`O nome do aluno é: ${listaDeAlunos[4]}`)

    //Usando o While
    console.log('*********** Exemplo com o While ******************')
    let cont = 0
    while(cont<listaDeAlunos.length){
        console.log(`O nome do aluno é: ${listaDeAlunos[cont]}`)
        cont+=1
    }

    //Usando o For
    console.log('************ Exemplo com  ***********')
    for(let contador = 0; contador < listaDeAlunos.length; contador++) //Não precisa de CHAVES
        console.log(`O nome do aluno é: ${listaDeAlunos[contador]}`)

    //Usando o FOR EACH
    console.log('************* Exemplo com For Each *************')
    listaDeAlunos.forEach(function(aluno){
        console.log(`O nome do aluno é: ${aluno}`)  
    })

    //Usando o FOR OF
    console.log('************* Exemplo com FOR OF ****************')
    for (aluno of listaDeAlunos){
        console.log(`O nome do aluno é: ${aluno}`)  
    }

    //Usando FOR IN
    console.log('********** EXEMPLO COM O FOR IN ******************')
    for (item in listaDeAlunos){
        console.log(`O nome do aluno é: ${listaDeAlunos[item]}`)  
    }

    //Retorna a quantidade de items em um array
    console.log(listaDeAlunos.length)
    
}
const manipularDados = function(){
    //Adicionando elementos de forma manual  pelo indice
    listaDeClientes[0] = "José da Silva"
    listaDeClientes[1] = "Maria da Silva"
    listaDeClientes[2] = "Luiz da Silva"
    listaDeClientes[3] = "Ana da Silva"

    console.log(listaDeClientes)

    //Permite adicionar novos elementos no ARRAY, sempre no FINAL
    listaDeFornecedores.push('Antônio')
    listaDeFornecedores.push('Caio')
    listaDeFornecedores.push('Luiz')

    console.log(listaDeFornecedores)


}
//exibirDados()
manipularDados()

