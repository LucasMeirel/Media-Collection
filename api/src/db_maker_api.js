require("dotenv").config({ path: "./.env" });
const {cadastrar} = require("./controllers/genreController.js")
const {cadastrar_filme} = require("./controllers/movieController.js")

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjQ3Yzg0MGIyNGJkYWE1ZDNmZDdhNWM0NGY4N2MzZSIsIm5iZiI6MTc5MjAwMzgwNy4xMjcsInN1YiI6IjZhY2ZjZWRmNGYzZmQ4YjUxNGYxN2QyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.piNpMwfXjl6IuzjMX5TqsCctkio2NJqaCw0prdu5hww'
  }
};

async function buscar_generos() {
  const generos = await fetch('https://api.themoviedb.org/3/genre/movie/list', options)
  const data_generos = await generos.json();

  for (const genero of data_generos.genres){
    console.log(genero.id, genero.name);
    cadastrar(genero.id, genero.name)
  }
}

async function buscar_filmes() {
    const max_id = 10000;
    for(var id = 1; id <= max_id; id++){
        const filmes = await fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
        const data_filmes = await filmes.json();

        var caminho_imagem = data_filmes.poster_path;

        if (!caminho_imagem){
            caminho_imagem = '';
        }

        const title = data_filmes.title;
        const release_date = data_filmes.release_date;
        const genre = data_filmes.genres;
        const genre_ids = [];
        const region = 1;


        if (title){
            for(const genero of genre){
                genre_ids.push(genero.id);
            }
            
            cadastrar_filme(id, title, release_date, genre_ids, caminho_imagem, region);
        }
    }
}

async function buscar_filmes_br() {
    const max_id = 10000;
    for(var id = 1; id <= max_id; id++){
        const filmes = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=pt-BR`, options);
        const filmes_us = await fetch(`https://api.themoviedb.org/3/movie/${id}`, options);
        const data_filmes = await filmes.json();
        const data_filmes_us = await filmes_us.json();

        var caminho_imagem = data_filmes.poster_path;

        if (!caminho_imagem){
            caminho_imagem = '';
        }

        const title_br = data_filmes.title;
        const title_us = data_filmes_us.title;

        const release_date = data_filmes.release_date;
        const genre = data_filmes.genres;
        const genre_ids = [];


        if (title_br){
            for(const genero of genre){
                genre_ids.push(genero.id);
            }
            
            cadastrar_filme(id, title_br, release_date, genre_ids, caminho_imagem, title_us);
        }
    }
}

//buscar_generos();
// buscar_filmes();
buscar_filmes_br();