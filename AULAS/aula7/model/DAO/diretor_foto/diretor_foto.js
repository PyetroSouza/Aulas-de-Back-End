/*****************************************************************************
 * Objeivo: Arquivo responsável pelo CRUD de dados da tabela da relação entre Diretor e Foto no banco de dados 
 *           MySQL
 * Data: 29/05/2026
 * Autor: Pyetro
 * Versão: 1.0
 *****************************************************************************/

//Import da biblioteca para manipular dados Banco de Dados MySql
const knex = require("knex")

//Import do arquivo de configuração para acesso ao banco de dados
const knexDataBaseConfig = require('../../database_config/knexConfig.js')

//Criar a conexão com o BD Mysql conforme o arquivo de configuração (no caso: knexDataBaseConfig)
const knexConection = knex(knexDataBaseConfig.development)

const insertDiretorFoto = async function (diretorFoto) {
    try {
        let sql =
            `insert into tbl_diretor_foto (
        id_foto,
        id_diretor
        ) values (
        ${diretorFoto.id_foto},
        ${diretorFoto.id_diretor}
        );`

        let result = await knexConection.raw(sql)

        if (result)
            return result[0].insertId
        else
            return false

    } catch (error) {
        return false
    }
}

const updateDiretorFoto = async function (diretorFoto) {
    try {
        let sql = `update tbl_diretor_foto set
        id_foto = ${diretorFoto.id_foto},
        id_diretor = ${diretorFoto.id_diretor}
        where id = ${diretorFoto.id}`

        let result = await knexConection.raw(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllDiretorFoto = async function () {
    try {
        let sql = `select * from tbl_diretor_foto order by id desc;`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const selectByIdDiretorFoto = async function (id) {
    try {
        let sql = `select * from tbl_diretor_foto where id = ${id}`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

//Função para retornar os dados do Genero filtrando pelo ID do Filme
const selectFotoByIdDiretor = async function (idDiretor) {
    try {
        let sql = `select tbl_foto.* 
                    from tbl_diretor
                        inner join tbl_diretor_foto
                            on tbl_diretor.id = tbl_diretor_foto.id_diretor
                        inner join tbl_foto
                            on tbl_foto.id = tbl_diretor_foto.id_foto 
                    where tbl_diretor.id = ${idDiretor}`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

const selectDiretorByIdFoto = async function (idFoto) {
    try {
        let sql = `select tbl_diretor.*
                    from tbl_diretor
                        inner join tbl_diretor_foto
                            on tbl_diretor.id = tbl_diretor_foto.id_diretor
                        inner join tbl_foto
                            on tbl_foto.id = tbl_diretor_foto.id_foto 
                    where tbl_foto.id = ${idFoto}`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

//Função para exlcuir um Filme genero pelo ID
const deleteDiretorFoto = async function (id) {
    try {
        let sql = `delete from tbl_diretor_foto where id = ${id};`

        let result = await knexConection.raw(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

//Função para excluir as fotos relacionados com um Diretor
//OBS: Esta função será utilizada no PUT do Diretor
const deleteFotosByIdDiretor = async function (idDiretor) {
    try {
        let sql = `delete from tbl_diretor_foto where id_diretor = ${idDiretor};`

        let result = await knexConection.raw(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}


module.exports = {
    insertDiretorFoto,
    updateDiretorFoto,
    selectAllDiretorFoto,
    selectByIdDiretorFoto,
    selectFotoByIdDiretor,
    selectDiretorByIdFoto,
    deleteDiretorFoto,
    deleteFotosByIdDiretor
}