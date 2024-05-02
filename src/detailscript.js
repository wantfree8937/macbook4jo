// 상세페이지 스크립트

window.onload = async () => {
    // 영화 id 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

//     // TMDB API 에서 영화 예고편 Key 가져와 배열 생성
// const fetch_MovieVideoData = async () => {

//     const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, {
//         method: 'GET',
//         headers: {
//             accept: 'application/json',
//             Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmM2U1NzkwNDYxZjE0Y2MwNWMxYzA0MzIwNTE4YzQ2YSIsInN1YiI6IjY2Mjc5ZTBkYjlhMGJkMDBjZGQ0NGI2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SN8whoS0_yG-gt7xue2f_CXakEcDCse_H4sgO3CmoyA'
//         }
//     });
//     const jsonData = await response.json();
//     return jsonData.results;
// }


    const youTubeUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`; // 백드롭 받아오기

    // 영화 정보 가져오기
    const movieDetails = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR&api_key=f3e5790461f14cc05c1c04320518c46a`);
    // const movieDetails = await fetch(`https://api.themoviedb.org/3/movie/297?language=ko-KR&api_key=f3e5790461f14cc05c1c04320518c46a`);
    const movieData = await movieDetails.json();

    // 영화 정보
    document.getElementById('detailTitle').textContent = movieData.title;
    document.getElementById('detailRating').textContent = movieData.vote_average;
    document.getElementById('detailPopularity').textContent = movieData.popularity;
    document.getElementById('detailRelease_date').textContent = movieData.release_date;
    document.getElementById('detailOverview').textContent = movieData.overview;

    // 영화 포스터
    document.getElementById('detailPoster').src = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;
    
    // 영화 백드롭
    document.getElementById('detailBackDrop').src = `https://image.tmdb.org/t/p/original${movieData.backdrop_path}`;

    displayReviews();
};


// 홈 버튼 클릭 시 메인 페이지로 이동하는 함수
function go_MainPage() {
    window.location.href = "index.html";
}

// 리뷰를 제출하는 함수
function submitReview() {
    const review = document.getElementById('review').value;
    const author = document.getElementById('author').value;
    const password = document.getElementById('password').value;

    // validation check
    if (review === '' || author === '' || password === '') {
        alert('모든 필드를 작성해주세요.');
        return;
    }

    if (review.length < 10) {
        alert('리뷰는 최소 10자 이상이어야 합니다.');
        return;
    }

    // 리뷰 객체 생성
    const reviewObj = {
        review: review,
        author: author,
        password: password
    };

    // 로컬 저장소에 리뷰 저장
    // 각 리뷰는 고유한 키를 사용하여 저장
    localStorage.setItem('movieReview_' + Date.now(), JSON.stringify(reviewObj));

    // 리뷰 제출 후 폼 초기화
    document.getElementById('reviewForm').reset();

    displayReviews();
}

// 리뷰 삭제하는 함수
function deleteReview(key) {
    const password = prompt('리뷰를 삭제하려면 비밀번호를 입력하세요:');
    if (password === null) {
        // 사용자가 취소를 선택한 경우
        return;
    }

    // 비밀번호 확인
    const reviewObj = JSON.parse(localStorage.getItem(key));
    if (reviewObj.password !== password) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
    }

    if (confirm('정말로 이 리뷰를 삭제하시겠습니까?')) {
        localStorage.removeItem(key);
        displayReviews(); // 삭제 후 리뷰 목록을 갱신하여 업데이트
    }
}

// 저장된 리뷰를 가져와서 표시하는 함수
function displayReviews() {
    const reviewContainer = document.getElementById('reviewContainer');
    reviewContainer.innerHTML = ''; // 기존에 표시된 리뷰 초기화

    // 모든 저장된 리뷰를 가져와서 표시
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('movieReview_')) {
            const reviewObj = JSON.parse(localStorage.getItem(key));
            const reviewElement = document.createElement('div');
            reviewElement.innerHTML = `<p><b>Author:</b> ${reviewObj.author}</p>
                                        <p><b>Review:</b> ${reviewObj.review}</p>
                                        <button onclick="deleteReview('${key}')">Delete</button>`; // 삭제 버튼 추가
            reviewContainer.appendChild(reviewElement);
        }
    }
}