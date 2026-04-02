const API = 'http://localhost:3000'

function buscarEstados() {
    fetch('http://localhost:3000/estados')
        .then(res => res.json())
        .then(dados => {
            const lista = document.getElementById('listaEstados')
            lista.innerHTML = ''

            dados.uf.forEach(uf => {
                const li = document.createElement('li')
                li.textContent = uf
                lista.appendChild(li)
            })
        })
        .catch(() => alert('Erro ao buscar estados'))
}

function buscarCidades() {
    const uf = document.getElementById('uf').value

    if (!uf) {
        alert('Digite um estado')
        return
    }

    fetch(`${API}/cidades/${uf}`)
        .then(res => res.json())
        .then(dados => {
            const lista = document.getElementById('listaCidades')
            lista.innerHTML = ''

            if (!dados.cidades) {
                lista.innerHTML = '<li>Nenhum resultado</li>'
                return
            }

            dados.cidades.forEach(cidade => {
                const li = document.createElement('li')
                li.textContent = cidade
                lista.appendChild(li)
            })
        })
        .catch(() => alert('Erro ao buscar cidades'))
}