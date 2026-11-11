movieModel = require("../models/movieModel");

async function cadastrar_filme(id, title, release_date, genre_ids, caminho_imagem, title_us, popularity) {
    await movieModel.cadastrar_filme(id, title, release_date, caminho_imagem, title_us, popularity);

    for(let i = 0; i < genre_ids.length; i++){
       await movieModel.cadastrar_filme_genero(id, genre_ids[i])
    }
}

module.exports = {
    cadastrar_filme
}