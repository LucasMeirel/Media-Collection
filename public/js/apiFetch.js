const maximo_filmes = 12;
const maximo_tentativa = 40;
var contagem_filmes = 0
var tentativa = 0

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjQ3Yzg0MGIyNGJkYWE1ZDNmZDdhNWM0NGY4N2MzZSIsIm5iZiI6MTc5MjAwMzgwNy4xMjcsInN1YiI6IjZhY2ZjZWRmNGYzZmQ4YjUxNGYxN2QyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.piNpMwfXjl6IuzjMX5TqsCctkio2NJqaCw0prdu5hww'
  }
};

async function buscar(){
    msg.innerHTML = '';
    contagem_filmes = 0;
    tentativa = 0;
    const query = ipt_filme.value;

    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}`, options);
    
    const data = await response.json()
    const pag = data.total_pages;

    for(var pagina = 1; pagina <= pag && tentativa < maximo_tentativa; pagina++){
        const resposta = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&page=${pagina}&include_adult=false`, options)
        const resposta_data = await resposta.json();
        // resposta_data.results.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));

        for (const movie of resposta_data.results){
            tentativa ++
            if (contagem_filmes >= maximo_filmes){
                break
            }
            msg.innerHTML += await buscar_releases(movie.id, movie);
        };
    }
}

async function buscar_releases(movie, movie_data){
    const filme = await fetch(`https://api.themoviedb.org/3/movie/${movie}/release_dates`, options);
    const data_filme = await filme.json();
    var teve_dvd = false;

    data_filme.results.forEach(pais => {
        pais.release_dates.forEach(lancamento => {
            if (lancamento.type === 5) {
                teve_dvd = true;
            }
    })
    })

    if(teve_dvd){
        console.log('imagem!')
        return await exibir_imagens(movie_data)
    }

    return '';
}

async function exibir_imagens(movie_data) {
    const caminho_imagem = movie_data.poster_path;
    const title = movie_data.title;
    const release_date = movie_data.release_date;
    console.log(title)

    if(!caminho_imagem){
        return ''
    }else{
        contagem_filmes++
        console.log(contagem_filmes)
        return `<div class="movie_div"> <img class="poster" src="https://image.tmdb.org/t/p/original/${caminho_imagem}"> <label class="movie_title">${title}</label> <label class="year">(${release_date})</label> </div>`
    }
    

}

// buscar();
/* const resposta_tudo = await fetch(`https://api.themoviedb.org/3/discover/movie`, options);
const data = await resposta_tudo.json()
console.log(data); */

/* data.results.forEach(element => {
    console.log(element.title)
}); */