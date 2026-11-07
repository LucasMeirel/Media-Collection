require("dotenv").config({ path: "./.env" });
const {cadastrar} = require("./controllers/genreController.js")

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

buscar_generos()