/*****************************************************************************
 * Objeivo: Arquivo responsável pelo CRUD de dados do gênero no banco de dados
 *           MySQL
 * Data: 08/05/2026
 * Autor: Pyetro
 * Versão: 1.0
 *****************************************************************************/

//Import da biblioteca para manipular dados Banco de Dados MySql
const knex = require("knex")

//Import do arquivo de configuração para acesso ao banco de dados
const knexDataBaseConfig = require('../../database_config/knexConfig.js')

//Criar a conexão com o BD Mysql conforme o arquivo de configuração (no caso: knexDataBaseConfig)
const knexConection = knex(knexDataBaseConfig.development)

const insertGenero = async function (genero) {
    try {
        let sql =
            `insert into tbl_genero (
        genero
        ) values (
        replace("${genero.genero}", "'", "")
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

const updateGenero = async function (genero) {
    try {
        let sql = `update tbl_genero set
        genero = replace("${genero.genero}", "'", "")
        where id = ${genero.id}
        `

        let result = await knexConection.raw(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllGenero = async function () {
    try {
        let sql = `select * from tbl_genero order by id desc;`

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

const selectByIdGenero = async function (id) {
    try {
        let sql = `select * from tbl_genero where id = ${id}`

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

const deleteGenero = async function (id) {
    try {
        let sql = `delete from tbl_genero where id = ${id};`

        let result = await knexConection.raw(sql)

        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

module.exports = {
    insertGenero,
    updateGenero,
    selectAllGenero,
    selectByIdGenero,
    deleteGenero
}