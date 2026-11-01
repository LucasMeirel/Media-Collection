var id = [];

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjQ3Yzg0MGIyNGJkYWE1ZDNmZDdhNWM0NGY4N2MzZSIsIm5iZiI6MTc5MjAwMzgwNy4xMjcsInN1YiI6IjZhY2ZjZWRmNGYzZmQ4YjUxNGYxN2QyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.piNpMwfXjl6IuzjMX5TqsCctkio2NJqaCw0prdu5hww'
  }
};

async function buscar(){
    msg.innerHTML = '';
    const query = ipt_filme.value;

    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}`, options);
    
    const data = await response.json()

    for (const movie of data.results){
        msg.innerHTML += await buscar_releases(movie.id) 
    };
}

async function buscar_releases(movie){
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
        return await exibir_imagens(movie)
    }

    return '';
}

async function exibir_imagens(movie) {
    const imagem = await fetch (`https://api.themoviedb.org/3/movie/${movie}`, options);
    const response = await imagem.json();
    const caminho_imagem = response.poster_path;

    if(!caminho_imagem){
        return ''
    }
    
    return `<img class="poster" src="https://image.tmdb.org/t/p/original/${caminho_imagem}" alt="">`
}

// buscar();
/* const resposta_tudo = await fetch(`https://api.themoviedb.org/3/discover/movie`, options);
const data = await resposta_tudo.json()
console.log(data); */

/* data.results.forEach(element => {
    console.log(element.title)
}); */