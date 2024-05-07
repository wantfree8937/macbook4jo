import { fetch_MovieData } from './movieFetchfile.js';

// 영화 데이터를 가져와서 포스터를 생성하고 캐러셀에 추가하는 함수
async function fetchMovieDataAndRender(page) {
    try {
        const movies = await fetch_MovieData(page);
        renderMoviePosters(movies);
    } catch (error) {
        console.error('Error fetching and rendering movies:', error);
    }
}

// 포스터 생성 함수 수정
function renderMoviePosters(movies) {
    const carousel = document.querySelector('.carousel');
    carousel.innerHTML = ''; // 캐러셀 내용 초기화

    movies.forEach(movie => {
        const posterURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        const posterImg = document.createElement('img');
        posterImg.classList.add('carouselPoster');
        posterImg.src = posterURL;
        posterImg.alt = movie.title;
        posterImg.addEventListener('click', () => goToDetailPage(movie.id)); // 클릭 이벤트 추가
        carousel.appendChild(posterImg);
    });
}

// 캐러셀 제어 함수 수정
function translateContainer(direction) {
    const carousel = document.querySelector('.carousel');
    const selectedBtn = (direction === 1) ? 'prev' : 'next';
    carousel.style.transitionDuration = '500ms';
    carousel.style.transform = `translateX(${direction * (100 / 5)}%)`;
    carousel.ontransitionend = () => reorganizeEl(selectedBtn);
}

// 캐러셀 요소 재정렬 함수
function reorganizeEl(selectedBtn) {
    const carousel = document.querySelector('.carousel');
    carousel.removeAttribute('style');
    if (selectedBtn === 'prev') {
        carousel.insertBefore(carousel.lastElementChild, carousel.firstElementChild);
    } else {
        carousel.appendChild(carousel.firstElementChild);
    }
}

// 디테일 페이지로 이동하는 함수
function goToDetailPage(movieId) {
    // 디테일 페이지 URL을 생성하고 이동
    const detailPageURL = `detail.html?id=${movieId}`;
    window.location.href = detailPageURL;
}

// 이전, 다음 버튼 이벤트 리스너 추가
const prevBtn = document.querySelector('.btn__prev');
const nextBtn = document.querySelector('.btn__next');
prevBtn.addEventListener('click', () => translateContainer(1));
nextBtn.addEventListener('click', () => translateContainer(-1));

// 페이지 로드 시 초기화 함수 호출
fetchMovieDataAndRender(1);
