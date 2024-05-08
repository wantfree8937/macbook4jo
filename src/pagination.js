import { fetch_MovieData } from './movieFetchfile.js';

let currentPage = 1; // 현재 페이지
let totalPageCount; // 총 페이지 개수
let totalDataCount; // 총 데이터 개수

// 페이지네이션 설정
export const setPagination = (page, totalDataCount, movies) => {
    let dataCount = 5; // 한 페이지에 나타낼 데이터 개수

    currentPage = page;

    // 총 페이지 개수 계산
    totalPageCount = Math.ceil(totalDataCount / dataCount);

    // 영화 포스터 표시
    displayMoviePosters(currentPage, totalDataCount, movies);
}

// 영화 포스터 표시 함수
const displayMoviePosters = (currentPage, totalDataCount, movies) => {
    let dataCount = 5; // 한 페이지에 나타낼 데이터 개수

    // 시작 인덱스와 끝 인덱스 계산
    let startIdx = (currentPage - 1) * dataCount;
    let endIdx = Math.min(startIdx + dataCount, totalDataCount);

    let movieContainer = document.getElementById('movie_Container');
    movieContainer.innerHTML = ""; // 기존 내용 지우기

    // 현재 페이지에 해당하는 영화 포스터만 표시
    for (let i = startIdx; i < endIdx; i++) {
        const posterURL = `https://image.tmdb.org/t/p/w500${movies[i].poster_path}`; // 포스터 URL

        const moviePoster = document.createElement('img');
        moviePoster.classList.add('movie_poster');
        moviePoster.src = posterURL;
        moviePoster.alt = movies[i].title;

        movieContainer.appendChild(moviePoster); // 영화 포스터 추가
    }
}

// 총 데이터 개수
try {
    const data = await fetch_MovieData(1);
    let totalDataCount = data.length;
    console.log(totalDataCount);
    setPagination(1, totalDataCount, data);
} catch (error) {
    console.error('Error fetching movie data:', error);
}

// 버튼 클릭이벤트
export const clickBtnEvent = () => {
    document.querySelector('.btn__prev').addEventListener('click', () => {
        if (currentPage > 1) currentPage -= 1;
        changePage("prev");
    });
    document.querySelector('.btn__next').addEventListener('click', () => {
        if (currentPage < totalPageCount) currentPage += 1;
        changePage("next");
    });
}

// 각 페이지버튼 상태변화
export const changePage = (page) => {
    if (page === "prev") page = currentPage - 1;
    else if (page === "next") page = currentPage + 1;

    if (currentPage != page) setPagination(page);
}

// 페이지 로드 시 영화 데이터 표시
window.addEventListener('load', async () => {
    try {
        const data = await fetch_MovieData(1);
        totalDataCount = data.length;

        // 데이터를 가져온 후 setPagination 호출
        setPagination(1, totalDataCount, data);
    } catch (error) {
        console.error('Error fetching and displaying movies:', error);
    }
});

// 버튼 클릭 이벤트 설정
document.querySelector('.btn__prev').addEventListener('click', () => {
    changePage("prev");
});

document.querySelector('.btn__next').addEventListener('click', () => {
    changePage("next");
});
console.log(currentPage);