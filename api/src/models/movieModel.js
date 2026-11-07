database = require("../database/config")

function cadastrar_filme(id, title, release_date, path, title_us) {
    title = title.replace(/'/g, "\\'");
    title_us = title_us.replace(/'/g, "\\'");
    path = path.replace(/'/g, "\\'");

    var instrucaoSql = `
        INSERT IGNORE INTO filme VALUES(${id}, '${release_date}');
        INSERT IGNORE INTO poster VALUES(${id}, '${path}', ${id});
        INSERT IGNORE INTO titulo(titulo, fk_filme, fk_regiao) VALUES('${title_us}', ${id}, 1);
        INSERT IGNORE INTO titulo(titulo, fk_filme, fk_regiao) VALUES('${title}', ${id}, 2);
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar_filme_genero(id, genre_id){
        var instrucaoSqlgenero = `
        INSERT INTO filme_genero VALUES(${id}, ${genre_id});
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSqlgenero);
    return database.executar(instrucaoSqlgenero);
}

module.exports = {
    cadastrar_filme,
    cadastrar_filme_genero
};