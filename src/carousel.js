import { fetch_MovieData } from './movieFetchfile.js';

const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.btn__prev');
const nextBtn = document.querySelector('.btn__next');

let posters = [];
let currentIndex = 0;

// 영화 데이터를 가져와서 포스터 URL을 추출하고 초기화하는 함수
async function fetchAndInitialize() {
    try {
        const data = await fetch_MovieData(1);
        posters = data.map(movie => `https://image.tmdb.org/t/p/w500${movie.poster_path}`);
        renderInitialPosters();
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
}

// 초기 포스터를 렌더링하는 함수
function renderInitialPosters() {
    for (let i = currentIndex; i < posters.length; i++) {
        const index = i % posters.length;
        const posterURL = posters[index];
        const posterImg = createPosterElement(posterURL, index);
        carousel.appendChild(posterImg);
    }
}

function movePrev() {
    currentIndex = (currentIndex - 1 + posters.length) % posters.length;
    const postersArray = Array.from(document.querySelectorAll('.poster'));

    // 200px 이동
    postersArray.forEach((poster) => {
        poster.style.transform = `translateX(${200}px)`;
    });

    // moveNext가 실행된 후에 updatePosters 함수 호출
    return new Promise((resolve) => {
        setTimeout(() => {
            updatePosters("prev");
            resolve();
        }, 1000); // 1초 뒤에 호출되도록 설정
    });
}

function moveNext() {
    currentIndex = (currentIndex + 1) % posters.length;
    const postersArray = Array.from(document.querySelectorAll('.poster'));

    // 200px 이동
    postersArray.forEach((poster) => {
        poster.style.transform = `translateX(${-200}px)`;
    });

    // moveNext가 실행된 후에 updatePosters 함수 호출
    return new Promise((resolve) => {
        setTimeout(() => {
            updatePosters("next");
            resolve();
        }, 1000); // 1초 뒤에 호출되도록 설정
    });
}

// 맨 앞과 맨 뒤의 포스터를 추가하고 제거하는 함수
function updatePosters(direction) {
    const existingPosters = document.querySelectorAll('.poster');
    const firstIndex = (currentIndex + 19) % posters.length;
    const lastIndex = (currentIndex + 6) % posters.length;

    if (direction === "prev") {
        const firstPosterURL = posters[firstIndex];
        const firstPosterImg = createPosterElement(firstPosterURL, firstIndex);
        carousel.insertBefore(firstPosterImg, carousel.firstChild);
        existingPosters[existingPosters.length - 1].remove();
    } else if (direction === "next") {
        const lastPosterURL = posters[lastIndex];
        const lastPosterImg = createPosterElement(lastPosterURL, lastIndex);
        carousel.appendChild(lastPosterImg);
        existingPosters[0].remove();
    }
}

// 포스터 엘리먼트를 생성하는 함수
function createPosterElement(posterURL, index) {
    const posterImg = document.createElement('img');
    posterImg.src = posterURL;
    posterImg.alt = `Poster ${index + 1}`;
    posterImg.classList.add('poster');
    return posterImg;
}

// 이전, 다음 버튼에 이벤트 리스너 추가
prevBtn.addEventListener('click', movePrev);
nextBtn.addEventListener('click', moveNext);

// 페이지 로드 시 초기화 함수 호출
fetchAndInitialize();