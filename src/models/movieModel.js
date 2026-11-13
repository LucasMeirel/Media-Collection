var database = require("../database/config")
const fs = require("fs");

function cadastrar_filme(id, title, release_date, path, path_us, title_us, popularity) {
    title = title.replace(/'/g, "\\'");
    title_us = title_us.replace(/'/g, "\\'");
    path = path.replace(/'/g, "\\'");

    var instrucaoSql = `
        INSERT IGNORE INTO filme VALUES(${id}, '${release_date}', ${popularity});
        INSERT IGNORE INTO poster(path, fk_filme, fk_regiao) VALUES('${path}', ${id}, 2),('${path_us}', ${id}, 1);
        INSERT IGNORE INTO titulo(titulo, fk_filme, fk_regiao) VALUES('${title_us}', ${id}, 1);
        INSERT IGNORE INTO titulo(titulo, fk_filme, fk_regiao) VALUES('${title}', ${id}, 2);
    `;

    salvar_query(instrucaoSql)
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar_filme_genero(id, genre_id){
        var instrucaoSqlgenero = `
        INSERT IGNORE INTO filme_genero VALUES(${id}, ${genre_id});
    `;

    salvar_query(instrucaoSqlgenero)
    console.log("Executando a instrução SQL: \n" + instrucaoSqlgenero);
    return database.executar(instrucaoSqlgenero);
}

function salvar_query(query) {
    fs.appendFileSync("queries.sql", query, "utf8");
}

module.exports = {
    cadastrar_filme,
    cadastrar_filme_genero
};