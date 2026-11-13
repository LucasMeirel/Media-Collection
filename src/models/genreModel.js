var database = require("../database/config")
const fs = require("fs");

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(idGenero, nome_genero) {
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT IGNORE INTO genero VALUES ('${idGenero}', '${nome_genero}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    salvar_query(instrucaoSql);
    return database.executar(instrucaoSql);
}

function salvar_query(query) {
    fs.appendFileSync("queries_genre.sql", query, "utf8");
}

module.exports = {
    cadastrar
};