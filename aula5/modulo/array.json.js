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


const exibirDados = function () {
    //Exibe o objeto ARRAY com o seu conteúdo
    console.log(listaDeAlunos)

    //Exibindo o tipo de dados de um indice 
    console.log(typeof (listaDeAlunos))

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
    while (cont < listaDeAlunos.length) {
        console.log(`O nome do aluno é: ${listaDeAlunos[cont]}`)
        cont += 1
    }

    //Usando o For
    console.log('************ Exemplo com  ***********')
    for (let contador = 0; contador < listaDeAlunos.length; contador++) //Não precisa de CHAVES
        console.log(`O nome do aluno é: ${listaDeAlunos[contador]}`)

    //Usando o FOR EACH
    console.log('************* Exemplo com For Each *************')
    listaDeAlunos.forEach(function (aluno) {
        console.log(`O nome do aluno é: ${aluno}`)
    })

    //Usando o FOR OF
    console.log('************* Exemplo com FOR OF ****************')
    for (aluno of listaDeAlunos) {
        console.log(`O nome do aluno é: ${aluno}`)
    }

    //Usando FOR IN
    console.log('********** EXEMPLO COM O FOR IN ******************')
    for (item in listaDeAlunos) {
        console.log(`O nome do aluno é: ${listaDeAlunos[item]}`)
    }

    //Retorna a quantidade de items em um array
    console.log(listaDeAlunos.length)

}
const manipularDados = function () {
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
    listaDeFornecedores.push('Hugo', 'Maria', 'José', 'André')

    console.table(listaDeFornecedores)

    //Permite adicionar novos elementos no ARRAY, sempre no INICIO
    //Após adicionar o elemento, ele reogarniza todos os outros itens
    listaDeFornecedores.unshift('Luciano') //Na lista de fornecedores irá adicionar no início da tabela nome Luciano   

    //Permite adicionar um novo elemento em uma determinada posição do ARRAY
    listaDeFornecedores.splice(3, 0, 'Bernardo')

    console.table(listaDeFornecedores)

    //Permite remover um determinado conteudo com base no indice do elemento ARRAY
    //splice (indice, qtde de elementos a ser removido)
    listaDeFornecedores.splice(6, 2)
    console.table(listaDeFornecedores)

    //Permite remover o último elemento do array
    listaDeFornecedores.pop()
    console.table(listaDeFornecedores)

    //Permite remover o primeiro elemento do array
    //Após ele remover, irá reorganizar todos os elementos
    listaDeFornecedores.shift()
    console.table(listaDeFornecedores)




}

const removerNome = function (nomeItem) {
    //versão for 1
    // for (valor = 0; listaDeAlunos[valor] !== nomeItem; valor++) { }
    // if (listaDeAlunos[valor] === nomeItem) listaDeAlunos.splice(valor, 1)
    // console.table(listaDeAlunos)
    // Para o valor recebe 0, o listaDeAlunos do indíce valor 0 for diferente ao valor do argumento de nomeItem, irá ir pro próximo índice
    //Se o indice do listadeAlunos for igual o argumento do nomeItem, irá remover do índice valor e a quantidade dele

    //Versão For In
    // for (cont in listaDeAlunos) {
    //     if (nomeItem == listaDeAlunos[cont]) {
    //         listaDeAlunos.splice(cont, 1)
    //     }
    // }

    // 

    //indexOf() -> retorna o indice referente ao conteúdo que está sendo pesquisado
    listaDeAlunos.splice(listaDeAlunos.indexOf(nomeItem), 1)
    //Na lista de alunos ira remover na lista de alunos 1 item do seguinte conteúdo do argumento "nomeItem"
}

const verificarItem = function (nome) {
    //Verifica se o conteúdo existe dentro do ARRAY e retorna (true/false)
    return (listaDeAlunos.includes(nome))
    //Mostrar na listadeAlunos se tem o seguinte conteúdo no argumento "nome"
}

const manipularDadosJSON = function () {
    //A estrutura do JSON é Chave (atributo) : Valor (conteúdo)
    let aluno = { "id": 1, "nome": "Bungas", "ra": 1234567890, "email": "bungas@gmail.com" }

    //Exibe o objeto JSON
    console.log(aluno)

    //Exiba o conteúdo de um atributpo do JSON
    console.log(aluno.nome)
    console.log(aluno.email)

    //Adiciona um novo atributo no JSON já existente
    aluno.telefone = "011-971706269"
    aluno.data_nascimento = "10/05/2000"

    console.log(aluno)

    //Remove um atributo do JSON
    delete aluno.email
    console.log(aluno)

    aluno.ra = 234567890

    console.log(aluno)

    aluno.nota = null
    console.log(aluno)
}

const cadastroProdutos = function () {
    let cores = [
        { "id": 1, "cor": "Branco", "hexa": "#fffffff" },
        { "id": 2, "cor": "Preto", "hexa": "#0000000" },
        { "id": 3, "cor": "Azul", "hexa": "#0000ff" },
        { "id": 4, "cor": "Amarelo", "hexa": "#ffff00" },
        { "id": 5, "cor": "Rosa", "hexa": "#ffb5c0" }
    ]
    let marca = [
        { "id": 1, "marca": "Dell", "telefone": "972539263", "email": "dell@gmail.com" },
        { "id": 2, "marca": "Multilaser", "telefone": "92464346", "email": "multilaser.com" },
        { "id": 3, "marca": "Positivo", "telefone": "9354684318", "email": "positivo@gmail.com" },
        { "id": 4, "marca": "Samsung", "telefone": "92461387954", "email": "samsung@gmail.com" },
        { "id": 5, "marca": "Apple", "telefone": "931387543484", "email": "apple@gmail.com" }
    ]
    cores.forEach(function (itemCor) {
        console.log(itemCor.cor)
    })
    marca.forEach(function (itemMarca) {
        console.table(itemMarca)
    })

    let produto = [
        {
            "id": 1,
            "nome": "monitor",
            "descricao": "descricaoproduto",
            "valor": 283,
            "quantidade": 2,
            "cor": [
                cores[0],
                cores[1]
            ],
            "marca": [marca[0].marca]
        },
        {
            "id": 2,
            "nome": "teclado",
            "descricao": "descricaoteclado",
            "valor": 456,
            "quantidade": 50,
            "cor": cores,
            "marca": [
                marca[4].marca,
                marca[3].marca,
                marca[4].marca
            ]
        },
        {
            "id": 3,
            "nome": "mouse",
            "descricao": "descricaomouse",
            "valor": 42,
            "quantidade": 67,
            "cor": [
                cores[1],
                cores[3],
                cores[4]
            ],
            "marca": [
                marca[1].marca,
                marca[3].marca,
                marca[4].marca,
                marca[2].marca
            ]
        }
    ]
    console.log('\n****************************************\n')
    produto.forEach(function(tipoProduto){
        console.log(`Produto: ${tipoProduto.nome}`)
        console.log(`Quantidade: ${tipoProduto.quantidade}`)
        console.log(`Valor: ${tipoProduto.valor}`)
        tipoProduto.cor.forEach(function (tipoCor){
            console.log(`Cor:   ${tipoCor.cor}`)
        })
        tipoProduto.marca.forEach(function(tipoMarca){
            console.log(`Marca:   ${tipoMarca}`)
        })
        console.log('\n****************************************\n')
        
    })
    // //Exibindo todas as cores referente ao produto "MONITOR"
    // produto[0].cor.forEach(function (cor) {
    //     console.log(cor.cor)
    // })
    // produto[1].cor.forEach(function (cor) {
    //     console.log(cor.cor)
    // })
    // produto[2].cor.forEach(function (cor) {
    //     console.log(cor.cor)
    // }) 
}
cadastroProdutos()
// manipularDadosJSON()
// console.log(verificarItem('Bungas'))
// exibirDados()
// manipularDados()
// removerNome('Maria')

