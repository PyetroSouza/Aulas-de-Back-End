/*****************************************************************************
 * Objeivo: Arquivo responsável pelo CRUD de dados da tabela da relação entre Filme e Gênero no banco de dados 
 *           MySQL
 * Data: 22/05/2026
 * Autor: Pyetro
 * Versão: 1.0
 *****************************************************************************/

//Import da biblioteca para manipular dados Banco de Dados MySql
const knex = require("knex")

//Import do arquivo de configuração para acesso ao banco de dados
const knexDataBaseConfig = require('../../database_config/knexConfig.js')

//Criar a conexão com o BD Mysql conforme o arquivo de configuração (no caso: knexDataBaseConfig)
const knexConection = knex(knexDataBaseConfig.development)

const insertFilmeGenero = async function (filmeGenero) {
    try {
        let sql =
            `insert into tbl_filme_genero (
        id_filme,
        id_genero
        ) values (
        ${filmeGenero.id_filme},
        ${filmeGenero.id_genero}
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

const updateFilmeGenero = async function (filmeGenero) {
    try {
        let sql = `update tbl_filme_genero set
        id_filme = ${filmeGenero.id_filme},
        id_genero = ${filmeGenero.id_genero}
        where id = ${filmeGenero.id}`

        let result = await knexConection.raw(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllFilmeGenero = async function () {
    try {
        let sql = `select * from tbl_filme_genero order by id desc;`

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

const selectByIdFilmeGenero = async function (id) {
    try {
        let sql = `select * from tbl_filme_genero where id = ${id}`

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
const selectGeneroByIdFilme = async function (idFilme) {
    try {
        let sql = `select tbl_genero.* 
                    from tbl_filme
                        inner join tbl_filme_genero
                            on tbl_filme.id = tbl_filme_genero.id_filme
                        inner join tbl_genero
                            on tbl_genero.id = tbl_filme_genero.id_genero 
                    where tbl_filme.id = ${idFilme}`

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

const selectFilmesByIdGenero = async function (idGenero) {
    try {
        let sql = `select tbl_filme.*
                    from tbl_filme
                        inner join tbl_filme_genero
                            on tbl_filme.id = tbl_filme_genero.id_filme
                        inner join tbl_genero
                            on tbl_genero.id = tbl_filme_genero.id_genero 
                    where tbl_genero.id = ${idGenero}`

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
const deleteFilmeGenero = async function (id) {
    try {
        let sql = `delete from tbl_filme_genero where id = ${id};`

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

//Função para excluir os generos relacionados com um filme
//OBS: Esta função será utilizada no PUT do Filme
const deleteGenerosByIdFilme = async function (idFilme) {
    try {
        let sql = `delete from tbl_filme_genero where id_filme = ${idFilme};`

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
    insertFilmeGenero,
    updateFilmeGenero,
    selectAllFilmeGenero,
    selectByIdFilmeGenero,
    selectGeneroByIdFilme,
    selectFilmesByIdGenero,
    deleteFilmeGenero,
    deleteGenerosByIdFilme
}