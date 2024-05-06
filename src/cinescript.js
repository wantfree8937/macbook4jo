// import pagination from './pagination.js';

let allMovies = [];

// 홈 버튼 클릭 시 메인 페이지로 이동하는 함수
function go_MainPage() {
  window.location.href = "index.html";
}

// TMDB API에서 영화 제목을 가져와 배열 생성
const fetch_MovieData = async (page) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=${page}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmM2U1NzkwNDYxZjE0Y2MwNWMxYzA0MzIwNTE4YzQ2YSIsInN1YiI6IjY2Mjc5ZTBkYjlhMGJkMDBjZGQ0NGI2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SN8whoS0_yG-gt7xue2f_CXakEcDCse_H4sgO3CmoyA",
      },
    }
  );
  const jsonData = await response.json();
  return jsonData.results;
};

const fetch_Movievideo = async (movie_id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/videos?language=ko-KR`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmM2U1NzkwNDYxZjE0Y2MwNWMxYzA0MzIwNTE4YzQ2YSIsInN1YiI6IjY2Mjc5ZTBkYjlhMGJkMDBjZGQ0NGI2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SN8whoS0_yG-gt7xue2f_CXakEcDCse_H4sgO3CmoyA",
      },
    }
  );
  const jsonData = await response.json();
  return jsonData.results;
};

// 영화 카드 만들기
const create_MovieCard = (movie) => {
  const movieContainer = document.getElementById("movie_Container");
  const movieCard = document.createElement("div");
  movieCard.classList.add("movie_card");

  const posterURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; // 포스터 받아오기
  const moviePoster = document.createElement("img");

  const backDropURL = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`; // 백드랍 받아오기
  const movieBackDrop = document.createElement("img");

  // 영화 카드에 요소들 추가
  moviePoster.classList.add("movie_poster");
  moviePoster.src = posterURL;
  moviePoster.alt = movie.title;

  movieBackDrop.classList.add("movie_backdrop");
  movieBackDrop.classList.add("movie_poster");

  movieBackDrop.src = backDropURL;
  movieBackDrop.alt = movie.title;

  const movieTitle = document.createElement("div");
  movieTitle.classList.add("movie_title");
  movieTitle.textContent = movie.title;

  const moviebutton = document.createElement("button"); //상세페이지로 가는 버튼 추가
  moviebutton.classList.add("movie_button");
  moviebutton.textContent = "더보기";
  moviebutton.addEventListener("click", () => {
    window.location.href = `detail.html?id=${movie.id}`; // 상세페이지로 이동
  });

  movieCard.appendChild(movieTitle);
  movieCard.appendChild(moviePoster);
  movieCard.appendChild(moviebutton);
  movieContainer.appendChild(movieCard);
};

const search_Movie = async (ev) => {
  // 이벤트 객체를 매개변수로 받는다

  ev.preventDefault(); // form에 의한 새로고침을 막음

  const movieContainer = document.getElementById("movie_Container"); // id: movie_Container의 요소를 가져옴

  // 이전에 표시된 영화 카드들 삭제
  movieContainer.innerHTML = "";

  // 검색된 영화 목록 생성
  const Moviefilter = allMovies.filter((movie) =>
    movie.title
      .toLowerCase()
      .includes(document.getElementById("search_input").value.toLowerCase())
  );

  Moviefilter.forEach((movie) => {
    create_MovieCard(movie);
  });

  return false; // form에 의한 새로고침을 막음
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
  const searchInput = document.getElementById("search_input");
  const searchButton = document.getElementById("search_button");

  const searchInput = document.getElementById("search_input");
  const searchButton = document.getElementById("search_button");

  if (searchInput.value !== "") {
    searchButton.disabled = false;
    searchButton.style.cursor = "pointer";
  } else {
    searchButton.disabled = true;
    searchButton.style.cursor = "default";
  }
};

const itemsPerPage = 20; // 페이지당 항목 수
const totalPages = 5; // 전체 페이지 수
let currentPage = 1; // 현재 페이지

// 페이지별 영화 데이터를 가져와 화면에 렌더링하는 함수
const fetchAndRenderMovies = async (page) => {
  try {
    const movies = await fetch_MovieData(page); // 페이지 정보를 사용하여 영화 데이터를 가져옴
    renderMovies(movies);
  } catch (error) {
    console.error("Error fetching and rendering movies:", error);
  }
};

// 영화 데이터를 화면에 렌더링하는 함수
const renderMovies = (movies) => {
  const movieContainer = document.getElementById("movie_Container");
  movieContainer.innerHTML = ""; // 기존에 표시된 영화 카드 초기화

  // 영화 카드 생성 및 표시
  movies.forEach((movie) => {
    create_MovieCard(movie);
  });

  // 영화 카드를 모두 렌더링한 후에 페이지네이션을 업데이트
  updatePagination();
};

// 페이지네이션을 렌더링하는 함수
const renderPagination = () => {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = ""; // 기존에 표시된 페이지네이션 초기화

  // 페이지네이션 버튼 생성
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.classList.add("button"); // 스타일링된 버튼 클래스 추가
    button.addEventListener("click", () => {
      currentPage = i;
      fetchAndRenderMovies(currentPage);
      scrollToTop(); // 버튼을 누르면 화면 맨 위로 스크롤
    });
    paginationContainer.appendChild(button);
  }
};

// 화면 맨 위로 스크롤하는 함수
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "auto", // 부드러운 스크롤 효과 제거
  });
};

const updatePagination = () => {
  // 전체 페이지 수를 계산
  totalPageCount = Math.ceil(allMovies.length / itemsPerPage);
  renderPagination(); // 페이지네이션 렌더링
};

// 최초 페이지 로드 시 초기화 및 페이지네이션 렌더링
window.addEventListener("load", async () => {
  await fetchAndRenderMovies(currentPage); // 페이지별 영화 데이터 가져와서 렌더링
});
