import { fetch_MovieData, create_MovieCard } from './movieFetchfile.js';

// 홈 버튼 클릭 시 메인 페이지로 이동하는 함수
function go_MainPage() {
    window.location.href = "index.html";
}
//검색 api를 호출하는 함수
async function fetch_SearchData(searchQuery, page) {
    const url = `https://api.themoviedb.org/3/search/movie?include_adult=true&language=ko-KR&page=${page}&query=${searchQuery}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYmZjYTAyM2VkNzE2NzlkOWFkODg4MDk0MzNkZTZjNyIsInN1YiI6IjY2MmYwYTYwYzNhYTNmMDEyYmZkOWUzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bTN_n03CEEcVclme6e9JtZLVbcB583M3z371ECvNldM'
        }
    };

    const response = await fetch(url, options);
    const data = await response.json();
    return data.results; // 결과 데이터만 반환
}

const search_Movie = async (ev) => {
    ev.preventDefault(); // form에 의한 새로고침을 막음
    const searchInput = document.getElementById('search_input').value.toLowerCase();
    const movieContainer = document.getElementById('movie_Container'); // id: movie_Container의 요소를 가져옴

    // 이전에 표시된 영화 카드들 삭제
    movieContainer.innerHTML = '';
    try {
        // 검색어와 페이지를 인자로 하여 검색 API 호출
        const movies = await fetch_SearchData(searchInput, 1); // 여기서는 첫 번째 페이지만 가져옴
        renderMovies(movies); // 검색 결과를 렌더링
    } catch (error) {
        console.error('Error fetching and rendering movies:', error);
    }
};

// // 인기순 정렬
// const popular_Sort = () => {

//     const movieContainer = document.getElementById('movie_Container');

//     movieContainer.innerHTML = '';

//     // 영화 인기도로 오름차순 정렬
//     const sortedMovies = allMovies.slice().sort((a, b) => b.popularity - a.popularity);

//     sortedMovies.forEach(movie => {
//         create_MovieCard(movie);
//     });
// }

// // 오래된순 정렬
// const old_Sort = () => {
//     const movieContainer = document.getElementById('movie_Container');

//     movieContainer.innerHTML = '';

//     // 영화 날짜로 내림차순 정렬
//     const sortMovie = allMovies.slice().sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

//     sortMovie.forEach(movie => {
//         create_MovieCard(movie);
//     });
// }

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

const totalPages = 200; // 전체 페이지 수
let currentPage = 1; // 현재 페이지

// 페이지별 영화 데이터를 가져와 화면에 렌더링하는 함수
const fetchAndRenderMovies = async (page) => {
    try {
        const movies = await fetch_MovieData(page); // 페이지 정보를 사용하여 영화 데이터를 가져옴
        renderMovies(movies);
    } catch (error) {
        console.error('Error fetching and rendering movies:', error);
    }
};

// 영화 데이터를 화면에 렌더링하는 함수
const renderMovies = (movies) => {
    const movieContainer = document.getElementById('movie_Container');
    movieContainer.innerHTML = ''; // 기존에 표시된 영화 카드 초기화

    // 영화 카드 생성 및 표시
    movies.forEach(movie => {
        create_MovieCard(movie);
    });

    // 영화 카드를 모두 렌더링한 후에 페이지네이션을 업데이트
    updatePagination();
};

// 페이지네이션을 렌더링하는 함수
const renderPagination = () => {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // 기존에 표시된 페이지네이션 초기화

    const numPagesToShow = 5; // 한 번에 표시할 페이지 수
    const totalPagesToShow = Math.min(totalPages, numPagesToShow); // 표시할 페이지 수와 전체 페이지 수 중 작은 값 선택

    let startPage = Math.max(currentPage - Math.floor(numPagesToShow / 2), 1); // 시작 페이지 계산
    let endPage = Math.min(startPage + numPagesToShow - 1, totalPages); // 끝 페이지 계산

    if (endPage - startPage < numPagesToShow - 1) {
        startPage = Math.max(endPage - numPagesToShow + 1, 1); // 시작 페이지 재조정
    }

    // 맨 앞 버튼 생성
    if (startPage > 1) {
        const firstButton = document.createElement('button');
        firstButton.textContent = '맨 앞';
        firstButton.classList.add('button');
        firstButton.addEventListener('click', () => {
            currentPage = 1;
            fetchAndRenderMovies(currentPage);
            scrollToTop();
        });
        paginationContainer.appendChild(firstButton);
    }


    // 이전 버튼 생성
    const prevButton = document.createElement('button');
    prevButton.textContent = '이전';
    prevButton.classList.add('button');
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchAndRenderMovies(currentPage);
            scrollToTop();
        }
    });
    paginationContainer.appendChild(prevButton);

    // 페이지 버튼 생성
    for (let i = startPage; i <= endPage; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.add('button'); // 스타일링된 버튼 클래스 추가
        if (i === currentPage) {
            button.classList.add('active');
        }
        button.addEventListener('click', () => {
            currentPage = i;
            fetchAndRenderMovies(currentPage);
            scrollToTop(); // 버튼을 누르면 화면 맨 위로 스크롤
        });
        paginationContainer.appendChild(button);
    }
    // 다음 버튼 생성
    const nextButton = document.createElement('button');
    nextButton.textContent = '다음';
    nextButton.classList.add('button');
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            fetchAndRenderMovies(currentPage);
            scrollToTop();
        }
    });
    paginationContainer.appendChild(nextButton);

    // 맨 뒤 버튼 생성
    if (endPage < totalPages) {
        const lastButton = document.createElement('button');
        lastButton.textContent = "맨 뒤";
        lastButton.classList.add('button');
        lastButton.addEventListener('click', () => {
            currentPage = totalPages;
            fetchAndRenderMovies(currentPage);
            scrollToTop();
        });
        paginationContainer.appendChild(lastButton);
    }

};

// 화면 맨 위로 스크롤하는 함수
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'auto' // 부드러운 스크롤 효과 제거
    });
};

const updatePagination = () => {
    // 전체 페이지 수를 계산
    renderPagination(); // 페이지네이션 렌더링
};

// 최초 페이지 로드 시 초기화 및 페이지네이션 렌더링
window.addEventListener('load', async () => {
    await fetchAndRenderMovies(currentPage); // 페이지별 영화 데이터 가져와서 렌더링
});

document.addEventListener('DOMContentLoaded', function () {
    const homeButton = document.querySelector('.subtomainbutton');
    const searchButton = document.getElementById('search_button');
    const searchInput = document.getElementById('search_input');
    // const selectedPopul = document.querySelector('.populbtn');
    // const selectedOld = document.querySelector('.oldbtn');

    homeButton.addEventListener('click', go_MainPage);
    searchButton.addEventListener('click', search_Movie);
    searchInput.addEventListener('input', toggle_SearchButton);
    // selectedPopul.addEventListener('click', popular_Sort);
    // selectedOld.addEventListener('click', old_Sort);
});

