// TMDB API에서 인기순으로 영화를 가져온다
export const fetch_MoviePopular = async (page) => {

    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmM2U1NzkwNDYxZjE0Y2MwNWMxYzA0MzIwNTE4YzQ2YSIsInN1YiI6IjY2Mjc5ZTBkYjlhMGJkMDBjZGQ0NGI2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SN8whoS0_yG-gt7xue2f_CXakEcDCse_H4sgO3CmoyA'
        }
    });
    const jsonData = await response.json();
    return jsonData.results;
}

// TMDB API에서 영화 제목을 가져와 배열 생성
export const fetch_MovieData = async (page) => {

    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=${page}`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmM2U1NzkwNDYxZjE0Y2MwNWMxYzA0MzIwNTE4YzQ2YSIsInN1YiI6IjY2Mjc5ZTBkYjlhMGJkMDBjZGQ0NGI2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SN8whoS0_yG-gt7xue2f_CXakEcDCse_H4sgO3CmoyA'
        }
    });
    const jsonData = await response.json();
    return jsonData.results;
}

export const fetch_Movievideo = async (movie_id) => {


    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?language=ko-KR`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmM2U1NzkwNDYxZjE0Y2MwNWMxYzA0MzIwNTE4YzQ2YSIsInN1YiI6IjY2Mjc5ZTBkYjlhMGJkMDBjZGQ0NGI2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SN8whoS0_yG-gt7xue2f_CXakEcDCse_H4sgO3CmoyA'
        }
    });
    const jsonData = await response.json();
    return jsonData.results;
}

// 영화 카드 만들기
export const create_MovieCard = (movie) => {
    const movieContainer = document.getElementById('movie_Container');
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie_card');


    const posterURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; // 포스터 받아오기
    const moviePoster = document.createElement('img');

    const backDropURL = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`; // 백드랍 받아오기
    const movieBackDrop = document.createElement('img');

    // 영화 카드에 요소들 추가
    moviePoster.classList.add('movie_poster');
    moviePoster.src = posterURL;
    moviePoster.alt = movie.title;

    movieBackDrop.classList.add('movie_backdrop', 'movie_poster');

    movieBackDrop.src = backDropURL;
    movieBackDrop.alt = movie.title;

    const movieTitle = document.createElement('div');
    movieTitle.classList.add('movie_title');
    movieTitle.textContent = movie.title;

    const moviebutton = document.createElement('button'); // 상세페이지로 가는 버튼 추가
    moviebutton.classList.add('movie_button');
    moviebutton.addEventListener('click', () => {
        window.location.href = `detail.html?id=${movie.id}`; // 상세페이지로 이동
    });

    const movieFlash = document.createElement('div');
    movieFlash.classList.add('movie_flash');
 

     // 카드에 후레쉬 추가
    
    
    movieCard.appendChild(moviebutton); 
    movieCard.appendChild(movieTitle);
    movieCard.appendChild(moviePoster);
    movieCard.appendChild(movieFlash); 
    movieContainer.appendChild(movieCard);

    // const movie_cards = document.querySelector('.movie_card')
    // movie_cards.addEventListener('mousemove', function () {
    //     console.log("yugi");
    //     movie_cards.style = 'transform:translate(10px,-10px)'
    // })
}