let allMovies = [];

// TMDB API에서 영화 제목을 가져와 배열 생성
const fetch_MovieData = async () => {

    const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmM2U1NzkwNDYxZjE0Y2MwNWMxYzA0MzIwNTE4YzQ2YSIsInN1YiI6IjY2Mjc5ZTBkYjlhMGJkMDBjZGQ0NGI2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SN8whoS0_yG-gt7xue2f_CXakEcDCse_H4sgO3CmoyA'
        }
    });
    const jsonData = await response.json();
    return jsonData.results;
}

const fetch_Movievideo = async () => {

    const response = await fetch('https://api.themoviedb.org/3/movie/movie_id/videos?language=en-US', {
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
const create_MovieCard = (movie) => {
    const movieContainer = document.getElementById('movie_Container');
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie_card');

    movieCard.addEventListener('click', () => {
        window.location.href = `detail.html?id=${movie.id}`; // 상세페이지로 이동
    });

    const posterURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; // 포스터 받아오기
    const moviePoster = document.createElement('img');

    // 영화 카드에 요소들 추가
    moviePoster.classList.add('movie_poster');
    moviePoster.src = posterURL;
    moviePoster.alt = movie.title;

    const movieTitle = document.createElement('div');
    movieTitle.classList.add('movie_title');
    movieTitle.textContent = movie.title;

    movieCard.appendChild(movieTitle);
    movieCard.appendChild(moviePoster);
    movieContainer.appendChild(movieCard);
}

(async () => {
    allMovies = await fetch_MovieData(); // 새로고침 시 영화 데이터를 한 번만 가져온다 
    allMoviesVideo = await fetch_Movievideo();
    allMovies.forEach(movie => create_MovieCard(movie)); // 영화 카드 생성
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

const rssFeedUrl = 'http://www.yonhapnewstv.co.kr/category/news/headline/feed/'; // 사용할 RSS 피드의 URL

// RSS 피드를 가져오는 함수
const fetchRssFeed = async (url) => {
    try {
        const response = await fetch(url);
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlText, 'text/xml');
        return xml;
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
        return null;
    }
}

// 가져온 RSS 피드를 처리하는 함수
const processRssFeed = async () => {
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = ''; // 이전에 표시된 뉴스 삭제

    try {
        const rssFeed = await fetchRssFeed(rssFeedUrl);
        if (!rssFeed) {
            console.error('Failed to fetch RSS feed.');
            return;
        }

        const items = rssFeed.querySelectorAll('item');
        if (items.length === 0) {
            console.error('No news items found in RSS feed.');
            return;
        }

        items.forEach(item => {
            const title = item.querySelector('title').textContent;
            const description = item.querySelector('description').textContent;
            const link = item.querySelector('link').textContent;

            const newsItem = document.createElement('div');
            newsItem.innerHTML = `
                <h3>${title}</h3>
                <p>${description}</p>
                <a href="${link}" target="_blank">Read More</a>
            `;
            newsContainer.appendChild(newsItem);
        });
    } catch (error) {
        console.error('Error processing RSS feed:', error);
        newsContainer.innerHTML = '<p>Failed to process RSS feed. Please try again later.</p>';
    }
}


// 페이지 로드 시 RSS 피드 가져오기
window.onload = processRssFeed;
