import pagination from './pagination.js';

let allMovies = [];

// 홈 버튼 클릭 시 메인 페이지로 이동하는 함수
function go_MainPage() {
    window.location.href = "index.html";
}

// TMDB API에서 영화 제목을 가져와 배열 생성
export const fetch_MovieData = async () => {

    const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1', {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmM2U1NzkwNDYxZjE0Y2MwNWMxYzA0MzIwNTE4YzQ2YSIsInN1YiI6IjY2Mjc5ZTBkYjlhMGJkMDBjZGQ0NGI2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SN8whoS0_yG-gt7xue2f_CXakEcDCse_H4sgO3CmoyA'
        }
    });
    const jsonData = await response.json();
    console.log(jsonData)
    return jsonData.results;
}


const fetch_Movievideo = async (movie_id) => {

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


// // 영화 카드 만들기
// const create_MovieCard = (movie) => {
//     const movieContainer = document.getElementById('movie_Container');
//     const movieCard = document.createElement('div');
//     movieCard.classList.add('movie_card');

//     // movieCard.addEventListener('click', () => {
//     //     window.location.href = `detail.html?id=${movie.id}`; // 상세페이지로 이동
//     // });

//     const posterURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; // 포스터 받아오기
//     const moviePoster = document.createElement('img');

//     const backDropURL = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`; // 백드랍 받아오기
//     const movieBackDrop = document.createElement('img');

//     // 영화 카드에 요소들 추가
//     moviePoster.classList.add('movie_poster');
//     moviePoster.src = posterURL;
//     moviePoster.alt = movie.title;

//     movieBackDrop.classList.add('movie_backdrop');
//     movieBackDrop.classList.add('movie_poster');

//     movieBackDrop.src = backDropURL;
//     movieBackDrop.alt = movie.title;

//     const movieTitle = document.createElement('div');
//     movieTitle.classList.add('movie_title');
//     movieTitle.textContent = movie.title;

//     const moviebutton = document.createElement('button');//상세페이지로 가는 버튼 추가
//     moviebutton.classList.add('movie_button');
//     moviebutton.textContent = "더보기";
//     moviebutton.addEventListener('click', () => {
//         window.location.href = `detail.html?id=${movie.id}`; // 상세페이지로 이동
//     });

//     movieCard.appendChild(movieTitle);
//     movieCard.appendChild(moviePoster);
//     movieCard.appendChild(moviebutton);
//     movieContainer.appendChild(movieCard);
// }

// 영화 카드 만들기
const create_MovieCard = (movie) => {
    const movieContainer = document.getElementById('movie_Container');
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie_card');

    // movieCard.addEventListener('click', () => {
    //     window.location.href = `detail.html?id=${movie.id}`; // 상세페이지로 이동
    // });

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

    // 유튜브로 이동하는 버튼 추가
    const youtubeButton = document.createElement('button');
    youtubeButton.classList.add('movie_button');
    youtubeButton.textContent = "유튜브로 이동";
    youtubeButton.addEventListener('click', async () => {
        const videos = await fetch_Movievideo(movie.id);
        if (videos && videos.length > 0) {
            const youtubeKey = videos[0].key;
            window.location.href = `https://www.youtube.com/watch?v=${youtubeKey}`;
        } else {
            alert("해당 영화의 유튜브 비디오가 없습니다.");
        }
    });

    movieCard.appendChild(movieTitle);
    movieCard.appendChild(moviePoster);
    movieCard.appendChild(moviebutton);
    movieCard.appendChild(youtubeButton); // 유튜브 버튼 추가
    movieContainer.appendChild(movieCard);
}


(async () => {
    allMovies = await fetch_MovieData(); // 새로고침 시 영화 데이터를 한 번만 가져온다 
    // allMovies = await fetch_MovieVideoData(); // 새로고침 시 영화 예고편 Key를 한 번만 가져온다
    allMovies.forEach(movie => create_MovieCard(movie)); // 영화 카드 생성
    pagination();
})();


const search_Movie = async (ev) => { // 이벤트 객체를 매개변수로 받는다

    ev.preventDefault(); // form에 의한 새로고침을 막음

    const movieContainer = document.getElementById('movie_Container'); // id: movie_Container의 요소를 가져옴

    // 이전에 표시된 영화 카드들 삭제
    movieContainer.innerHTML = '';

    // 검색된 영화 목록 생성
    const Moviefilter = allMovies.filter(movie =>
        movie.title.toLowerCase().includes(document.getElementById('search_input').value.toLowerCase())
    );

    Moviefilter.forEach(movie => {
        create_MovieCard(movie);
    });

    return false; // form에 의한 새로고침을 막음
}

// 인기순 정렬
const popular_Sort = () => {

    const movieContainer = document.getElementById('movie_Container');

    movieContainer.innerHTML = '';

    // 영화 인기도로 오름차순 정렬
    const sortedMovies = allMovies.slice().sort((a, b) => b.popularity - a.popularity);

    sortedMovies.forEach(movie => {
        create_MovieCard(movie);
    });
}

// 오래된순 정렬
const old_Sort = () => {
    const movieContainer = document.getElementById('movie_Container');

    movieContainer.innerHTML = '';

    // 영화 날짜로 내림차순 정렬
    const sortMovie = allMovies.slice().sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

    sortMovie.forEach(movie => {
        create_MovieCard(movie);
    });
}

// 투명 검색 버튼 활성화/비활성화
const toggle_SearchButton = () => {

    const searchInput = document.getElementById('search_input');
    const searchButton = document.getElementById('search_button');

    if (searchInput.value !== '') {
        searchButton.disabled = false;
        searchButton.style.cursor = "pointer";
    } else {
        searchButton.disabled = true;
        searchButton.style.cursor = "default";
    }
}

// RSS 피드 URL
const rssFeedUrl = 'https://api.newswire.co.kr/rss/industry/1206';

// 뉴스를 가져와서 화면에 표시하는 함수
const fetchNewsFromRss = async () => {
    try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssFeedUrl}`);
        const data = await response.json();

        if (data.status === 'ok') {
            displayNews(data.items);
        } else {
            alert('RSS 피드를 가져오는 데 문제가 발생했습니다.');
        }
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
        alert('RSS 피드를 가져오는 데 문제가 발생했습니다.');
    }
};

// 뉴스를 화면에 표시하는 함수
const displayNews = (items) => {
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = ''; // 기존에 표시된 뉴스 삭제

    items.forEach(item => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');

        const title = document.createElement('h2');
        title.textContent = item.title;

        const description = document.createElement('div');
        description.innerHTML = item.description;

        // 이미지 제거
        const images = description.querySelectorAll('img');
        images.forEach(image => {
            image.parentNode.removeChild(image);
        });

        // 뉴스 전체 영역을 클릭했을 때 이벤트 처리
        newsItem.addEventListener('click', () => {
            window.open(item.link, '_blank'); // 새 탭에서 링크 열기
        });

        newsItem.appendChild(title);
        newsItem.appendChild(description);

        newsContainer.appendChild(newsItem);
    });
};

// 페이지 로드 시 뉴스 가져오기
window.addEventListener('load', fetchNewsFromRss);