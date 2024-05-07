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

    

    movieBackDrop.classList.add('movie_backdrop');
    movieBackDrop.classList.add('movie_poster');

    movieBackDrop.src = backDropURL;
    movieBackDrop.alt = movie.title;

    const movieTitle = document.createElement('div');
    movieTitle.classList.add('movie_title');
    movieTitle.textContent = movie.title;

    const moviebutton = document.createElement('button');//상세페이지로 가는 버튼 추가
    moviebutton.classList.add('movie_button');
    moviebutton.textContent = "더보기";
    moviebutton.addEventListener('click', () => {
        window.location.href = `detail.html?id=${movie.id}`; // 상세페이지로 이동
    });

    const movieLight = document.createElement('div');
    movieLight.classList.add('movie_light');
    const movieLights = document.querySelector('.movie_light');

    
    // moviebutton.addEventListener('mouseenter', () => {
    //     console.log("패치");
    //     // movieLights.classList.remove('movie_light');
    //     movieLights.classList.replace('movie_light','movie_light_on');
    // });

    // // movieButton.addEventListener('mouseleave', () => {
    // //     movieLights.classList.replace('movie_light_on','movie_light');
    // // });

    movieCard.appendChild(movieLight);
    movieCard.appendChild(movieTitle);
    movieCard.appendChild(moviePoster);
    movieCard.appendChild(moviebutton);
    movieContainer.appendChild(movieCard);
}
