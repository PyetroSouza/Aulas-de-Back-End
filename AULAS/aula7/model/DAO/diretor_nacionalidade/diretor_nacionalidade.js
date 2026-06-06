/*****************************************************************************
 * Objeivo: Arquivo responsável pelo CRUD de dados da tabela da relação entre Diretor e Nacionalidade no banco de dados 
 *           MySQL
 * Data: 05/06/2026
 * Autor: Pyetro
 * Versão: 1.0
 *****************************************************************************/

//Import da biblioteca para manipular dados Banco de Dados MySql
const knex = require("knex")

//Import do arquivo de configuração para acesso ao banco de dados
const knexDataBaseConfig = require('../../database_config/knexConfig.js')

//Criar a conexão com o BD Mysql conforme o arquivo de configuração (no caso: knexDataBaseConfig)
const knexConection = knex(knexDataBaseConfig.development)

const insertDiretorNacionalidade = async function (diretorNacionalidade) {
    try {
        let sql =
            `insert into tbl_diretor_nacionalidade (
        id_diretor,
        id_nacionalidade
        ) values (
        ${diretorNacionalidade.id_diretor},
        ${diretorNacionalidade.id_nacionalidade}
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

const updateDiretorNacionalidade = async function (diretorNacionalidade) {
    try {
        let sql = `update tbl_diretor_nacionalidade set
        id_nacionalidade = ${diretorNacionalidade.id_nacionalidade},
        id_diretor = ${diretorNacionalidade.id_diretor}
        where id = ${diretorNacionalidade.id}`

        let result = await knexConection.raw(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllDiretorNacionalidade = async function () {
    try {
        let sql = `select * from tbl_diretor_nacionalidade order by id desc;`

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

const selectByIdDiretorNacionalidade = async function (id) {
    try {
        let sql = `select * from tbl_diretor_nacionalidade where id = ${id}`

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
const selectNacionalidadeByIdDiretor = async function (idDiretor) {
    try {
        let sql = `select tbl_nacionalidade.* 
                    from tbl_diretor
                        inner join tbl_diretor_nacionalidade
                            on tbl_diretor.id = tbl_diretor_nacionalidade.id_diretor
                        inner join tbl_nacionalidade
                            on tbl_nacionalidade.id = tbl_diretor_nacionalidade.id_nacionalidade
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

const selectDiretorByIdNacionalidade = async function (idNacionalidade) {
    try {
        let sql = `select tbl_diretor.*
                    from tbl_diretor
                        inner join tbl_diretor_nacionalidade
                            on tbl_diretor.id = tbl_diretor_nacionalidade.id_diretor
                        inner join tbl_nacionalidade
                            on tbl_nacionalidade.id = tbl_diretor_nacionalidade.id_nacionalidade
                    where tbl_nacionalidade.id = ${idNacionalidade}`

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
const deleteDiretorNacionalidade = async function (id) {
    try {
        let sql = `delete from tbl_diretor_nacionalidade where id = ${id};`

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
const deleteNacionalidadeByIdDiretor = async function (idDiretor) {
    try {
        let sql = `delete from tbl_diretor_nacionalidade where id_diretor = ${idDiretor};`

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
    insertDiretorNacionalidade,
    updateDiretorNacionalidade,
    selectAllDiretorNacionalidade,
    selectByIdDiretorNacionalidade,
    selectDiretorByIdNacionalidade,
    selectNacionalidadeByIdDiretor,
    deleteDiretorNacionalidade,
    deleteNacionalidadeByIdDiretor
}