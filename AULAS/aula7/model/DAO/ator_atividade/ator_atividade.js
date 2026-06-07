/*****************************************************************************
 * Objeivo: Arquivo responsável pelo CRUD de dados da tabela da relação entre Ator e Atividade no banco de dados 
 *           MySQL
 * Data: 06/06/2026
 * Autor: Pyetro
 * Versão: 1.0
 *****************************************************************************/

//Import da biblioteca para manipular dados Banco de Dados MySql
const knex = require("knex")

//Import do arquivo de configuração para acesso ao banco de dados
const knexDataBaseConfig = require('../../database_config/knexConfig.js')

//Criar a conexão com o BD Mysql conforme o arquivo de configuração (no caso: knexDataBaseConfig)
const knexConection = knex(knexDataBaseConfig.development)

const insertAtorAtividade = async function (atorAtividade) {
    try {
        let sql =
            `insert into tbl_ator_atividade (
        id_ator,
        id_atividade
        ) values (
        ${atorAtividade.id_ator},
        ${atorAtividade.id_atividade}
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

const updateAtorAtividade = async function (atorAtividade) {
    try {
        let sql = `update tbl_ator_atividade set
        id_atividade = ${atorAtividade.id_atividade},
        id_ator = ${atorAtividade.id_ator}
        where id = ${atorAtividade.id}`

        let result = await knexConection.raw(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllAtorAtividade = async function () {
    try {
        let sql = `select * from tbl_ator_atividade order by id desc;`

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

const selectByIdAtorAtividade = async function (id) {
    try {
        let sql = `select * from tbl_ator_atividade where id = ${id}`

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
const selectAtividadeByIdAtor = async function (idAtor) {
    try {
        let sql = `select tbl_atividade.* 
                    from tbl_ator
                        inner join tbl_ator_atividade
                            on tbl_ator.id = tbl_ator_atividade.id_ator
                        inner join tbl_atividade
                            on tbl_atividade.id = tbl_ator_atividade.id_atividade
                    where tbl_ator.id = ${idAtor}`

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

const selectAtorByIdAtividade = async function (idAtividade) {
    try {
        let sql = `select tbl_ator.*
                    from tbl_ator
                        inner join tbl_ator_atividade
                            on tbl_ator.id = tbl_ator_atividade.id_ator
                        inner join tbl_atividade
                            on tbl_atividade.id = tbl_ator_atividade.id_atividade
                    where tbl_atividade.id = ${idAtividade}`

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
const deleteAtorAtividade = async function (id) {
    try {
        let sql = `delete from tbl_ator_atividade where id = ${id};`

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
const deleteAtividadeByIdAtor = async function (idAtor) {
    try {
        let sql = `delete from tbl_ator_atividade where id_ator = ${idAtor};`

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

const deleteAtorByIdAtividade = async function (idAtividade) {
    try {
        let sql = `delete from tbl_ator_atividade where id_atividade = ${idAtividade};`

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
    insertAtorAtividade,
    updateAtorAtividade,
    selectAllAtorAtividade,
    selectByIdAtorAtividade,
    selectAtorByIdAtividade,
    selectAtividadeByIdAtor,
    deleteAtorAtividade,
    deleteAtividadeByIdAtor,
    deleteAtorByIdAtividade
}