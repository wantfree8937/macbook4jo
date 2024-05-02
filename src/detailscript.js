// 상세페이지 스크립트

window.onload = async () => {
    // 영화 id 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    // 영화 정보 가져오기
    const movieDetails = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=f3e5790461f14cc05c1c04320518c46a`);
    const movieData = await movieDetails.json();

    // 영화 정보
    document.getElementById('detailTitle').textContent = movieData.title;
    document.getElementById('detailRating').textContent = movieData.vote_average;
    document.getElementById('detailPopularity').textContent = movieData.popularity;
    document.getElementById('detailRelease_date').textContent = movieData.release_date;
    document.getElementById('detailOverview').textContent = movieData.overview;

    // 영화 포스터
    document.getElementById('detailPoster').src = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;
};

// 홈 버튼 클릭 시 메인 페이지로 이동하는 함수
function go_MainPage() {
    window.location.href = "index.html";
}