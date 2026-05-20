/*****************************************************************************
 * Objeivo: Arquivo responsável pelo CRUD de dados do diretor no banco de dados
 *           MySQL
 * Data: 15/04/2026
 * Autor: Pyetro
 * Versão: 1.0
 *****************************************************************************/

//Import da biblioteca para manipular dados Banco de Dados MySql
const knex = require("knex")

//Import do arquivo de configuração para acesso ao banco de dados
const knexDataBaseConfig = require('../../database_config/knexConfig.js')

//Criar a conexão com o BD Mysql conforme o arquivo de configuração (no caso: knexDataBaseConfig)
const knexConection = knex(knexDataBaseConfig.development)

const insertDiretor = async function (diretor) {
    try {
        let sql = `insert into tbl_diretor (
        nome,
        data_nascimento,
        ano_inicio_carreira,
        id_sexo
        ) values (
         replace("${diretor.nome}", "'", ""),
         replace("${diretor.data_nascimento}", "'", ""),
         replace("${diretor.ano_inicio_carreira}", "'", ""),
         ${diretor.id_sexo}
         );`

        let result = await knexConection.raw(sql)
        if (result) {
            return result[0].insertId
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const updateDiretor = async function (diretor) {
    {
        try {
            let sql = `update tbl_diretor set
            nome                 = '${diretor.nome}',
            data_nascimento      = '${diretor.data_nascimento}',
            ano_inicio_carreira  = '${diretor.ano_inicio_carreira}',
            id_sexo              =  ${diretor.id_sexo}
            where id = ${diretor.id}`

            let result = await knexConection.raw(sql)
            if (result)
                return true
            else
                return false

        } catch (error) {
            return false
        }
    }
}
const selectAllDiretor = async function () {
    {
        try {
            let sql = 'select * from tbl_diretor order by id desc'
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
}
const selectByIdDiretor = async function (id) {
    try {
        let sql = `select * from tbl_diretor where id = ${id};`
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
const deleteDiretor = async function (id) {
    try {
        let sql = `delete from tbl_sexo where id = ${id};`
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
    insertDiretor,
    updateDiretor,
    selectAllDiretor,
    selectByIdDiretor,
    deleteDiretor
}