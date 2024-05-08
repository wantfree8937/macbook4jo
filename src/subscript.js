import { fetch_MovieData, create_MovieCard, fetch_MoviePopular } from './movieFetchfile.js';

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
        const movies = await fetch_SearchData(searchInput, 1);
        renderMovies(movies);
    } catch (error) {
        console.error('Error fetching and rendering movies:', error);
    }
};

// 인기순 정렬
const popular_Sort = async () => {
    try {
        await fetchAndRenderMovies(1, true); // 첫 번째 페이지의 검색 데이터 가져와서 렌더링
    } catch (error) {
        console.error('Error sorting movies by popularity:', error);
    }
};

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
const fetchAndRenderMovies = async (page, isPopularSort = false) => {
    try {
        if (isPopularSort) {
            const movies = await fetch_MoviePopular(page); // 검색 데이터 가져오기
            renderMovies(movies);
        } else {
            const movies = await fetch_MovieData(page); // 페이지 정보를 사용하여 영화 데이터를 가져옴
            renderMovies(movies);
        }
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
function renderPagination() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // 기존에 표시된 페이지네이션 초기화

    const numPagesToShow = 5; // 한 번에 표시할 페이지 수

    let startPage = Math.max(currentPage - Math.floor(numPagesToShow / 2), 1); // 시작 페이지 계산
    let endPage = Math.min(startPage + numPagesToShow - 1, totalPages); // 끝 페이지 계산
    console.log(startPage);
    console.log(endPage);
    console.log(currentPage);
    if (endPage - startPage < numPagesToShow - 1) {
        startPage = Math.max(endPage - numPagesToShow + 1, 1); // 시작 페이지 재조정
    }

    // 맨 앞 버튼 생성
    if (startPage > 1) {
        const firstButton = document.createElement('button');
        firstButton.textContent = '맨 앞';
        firstButton.classList.add('button');
        firstButton.addEventListener('click', () => {
            handlePageButtonClick(1);
        });
        paginationContainer.appendChild(firstButton);
    }

    // 이전 버튼 생성
    const prevButton = document.createElement('button');
    prevButton.textContent = '이전';
    prevButton.classList.add('button');
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            handlePageButtonClick(currentPage - 1);
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
            handlePageButtonClick(i); // 페이지 버튼 클릭 시 이벤트 핸들러 호출
        });
        paginationContainer.appendChild(button);
    }

    // 다음 버튼 생성
    const nextButton = document.createElement('button');
    nextButton.textContent = '다음';
    nextButton.classList.add('button');
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            handlePageButtonClick(currentPage + 1);
        }
    });
    paginationContainer.appendChild(nextButton);

    // 맨 뒤 버튼 생성
    if (endPage < totalPages) {
        const lastButton = document.createElement('button');
        lastButton.textContent = "맨 뒤";
        lastButton.classList.add('button');
        lastButton.addEventListener('click', () => {
            handlePageButtonClick(totalPages);
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

const handlePageButtonClick = async (pageNumber) => {
    try {
        const url = new URL(window.location.href);
        url.searchParams.set('page', pageNumber);
        window.location.href = url.toString();
    } catch (error) {
        console.error('Error fetching and rendering movies:', error);
    }
};

const updatePagination = () => {
    // 전체 페이지 수를 계산
    renderPagination(); // 페이지네이션 렌더링
};

window.addEventListener('load', async () => {
    // URL에서 페이지 번호 쿼리 파라미터 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const pageQueryParam = urlParams.get('page');

    // 현재 페이지 설정
    currentPage = pageQueryParam ? parseInt(pageQueryParam, 10) : 1;

    // 페이지네이션 렌더링
    renderPagination();

    // 페이지별 영화 데이터 가져와서 렌더링
    await fetchAndRenderMovies(currentPage);
});

document.addEventListener('DOMContentLoaded', function () {
    const homeButton = document.querySelector('.subtomainbutton');
    const searchButton = document.getElementById('search_button');
    const searchInput = document.getElementById('search_input');
    const selectedPopul = document.querySelector('.populbtn');
    // const selectedOld = document.querySelector('.oldbtn');

    homeButton.addEventListener('click', go_MainPage);
    searchButton.addEventListener('click', search_Movie);
    searchInput.addEventListener('input', toggle_SearchButton);
    selectedPopul.addEventListener('click', popular_Sort);
    // selectedOld.addEventListener('click', old_Sort);
});