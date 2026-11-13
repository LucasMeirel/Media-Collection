var database = require("../database/config")

function pesquisar(search, filtro) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", search)
    var instrucaoSql = `
        SELECT DISTINCT idFilme, path, titulo, dt_lancamento, popularidade, regiao.regiao FROM filme
        JOIN poster ON filme.idFilme = poster.fk_filme
        JOIN titulo ON filme.idFilme = titulo.fk_filme
        JOIN regiao ON idRegiao = titulo.fk_regiao AND idRegiao = poster.fk_regiao
        WHERE (titulo.fk_regiao = 1) AND titulo LIKE '%${search}%'
        ORDER BY popularidade DESC
        LIMIT 14;
    `;
    // console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    pesquisar
};