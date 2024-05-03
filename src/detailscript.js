// 상세페이지 스크립트

window.onload = async () => {
    // 영화 id 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("id");
    // const youTubeUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`; // 백드롭 받아오기
    // 영화 정보 가져오기
    const movieDetails = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR&api_key=f3e5790461f14cc05c1c04320518c46a`
    );
    const movieData = await movieDetails.json();
  
    // 영화 정보
    document.getElementById("detailTitle").textContent = movieData.title;
    document.getElementById("detailRating").textContent = movieData.vote_average;
    document.getElementById("detailPopularity").textContent =
      movieData.popularity;
    document.getElementById("detailRelease_date").textContent =
      movieData.release_date;
    document.getElementById("detailOverview").textContent = movieData.overview;
  
    // 영화 포스터
    document.getElementById(
      "detailPoster"
    ).src = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;
  
    // 영화 백드롭
    document.getElementById(
      "detailBackDrop"
    ).src = `https://image.tmdb.org/t/p/original${movieData.backdrop_path}`;
  
    // 영화 백드랍
    document.getElementById(
      "detailBackDrop"
    ).src = `https://image.tmdb.org/t/p/original${movieData.backdrop_path}`;
    console.log(movieId);
  
    const movieVod = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US&api_key=c5fe0771fbdf49a3f798ca176b3e7b69`
    );
    const movieVodData = await movieVod.json();
    const firstVideoKey = movieVodData.results[0].key; // 첫 번째 비디오의 키를 추출합니다.
    console.log(firstVideoKey); // 첫 번째 비디오의 키를 콘솔에 출력합니다.
  
    document.getElementById(
      "detailMovieVod"
    ).src = `https://www.youtube.com/embed/${firstVideoKey}`;
  
    displayReviews();
  };
  
  // 홈 버튼 클릭 시 메인 페이지로 이동하는 함수
  function go_MainPage() {
    window.location.href = "index.html";
  }
  
  // 리뷰를 제출하는 함수
  function submitReview() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("id");
    const review = document.getElementById("review").value;
    const author = document.getElementById("author").value;
    const password = document.getElementById("password").value;
  
    // validation check
    if (review === "" || author === "" || password === "") {
      alert("모든 필드를 작성해주세요.");
      return;
    }
  
    if (review.length < 10) {
      alert("리뷰는 최소 10자 이상이어야 합니다.");
      return;
    }
  
    // 리뷰 객체 생성
    const reviewObj = {
      review: review,
      author: author,
      password: password,
      movieId: movieId,
    };
    console.log(reviewObj.movieId);
    // 로컬 저장소에 리뷰 저장
    // 각 리뷰는 고유한 키를 사용하여 저장
    const reviewKey = "movieReview_" + Date.now();
    localStorage.setItem(reviewKey, JSON.stringify(reviewObj));
  
    // 타이핑 애니메이션 효과
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < review.length) {
        // 타이핑 효과를 주기 위해 새로운 글자를 하나씩 추가하여 보여줌
        reviewObj.review = review.substring(0, index + 1);
        localStorage.setItem(reviewKey, JSON.stringify(reviewObj));
        displayReviews(); // 수정된 리뷰를 화면에 표시
        index++;
      } else {
        // 모든 글자를 출력한 후에 타이핑 애니메이션 종료
        clearInterval(typingInterval);
        displayReviews(); // 제출 후 리뷰 목록을 갱신하여 업데이트
      }
    }, 100); // 타이핑 속도 (밀리초 단위)
  
    // 리뷰 제출 후 폼 초기화
    document.getElementById("reviewForm").reset();
  
    displayReviews();
  }
  
  // 리뷰 삭제하는 함수
  function deleteReview(key) {
    const password = prompt("리뷰를 삭제하려면 비밀번호를 입력하세요:");
    if (password === null) {
      // 사용자가 취소를 선택한 경우
      return;
    }
  
    // 비밀번호 확인
    const reviewObj = JSON.parse(localStorage.getItem(key));
    if (reviewObj.password !== password) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
  
    if (confirm("정말로 이 리뷰를 삭제하시겠습니까?")) {
      localStorage.removeItem(key);
      displayReviews(); // 삭제 후 리뷰 목록을 갱신하여 업데이트
    }
  }
  // 리뷰 수정하는 함수
  function editReview(key) {
    const password = prompt("리뷰를 수정하려면 비밀번호를 입력하세요:");
    if (password === null) {
      // 사용자가 취소를 선택한 경우
      return;
    }
  
    // 비밀번호 확인
    const reviewObj = JSON.parse(localStorage.getItem(key));
    if (reviewObj.password !== password) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
  
    if (confirm("정말로 이 리뷰를 수정하시겠습니까?")) {
      const Newreview = prompt("수정할 내용을 입력하세요 :");
      reviewObj.review = Newreview;
      localStorage.setItem(key, JSON.stringify(reviewObj));
      displayReviews(); // 수정 후 리뷰 목록을 갱신하여 업데이트
    }
  }
  
  // 저장된 리뷰를 가져와서 표시하는 함수
  function displayReviews() {
    const urlParams = new URLSearchParams(window.location.search);
    const pageId = urlParams.get("id");
    console.log(pageId);
    const reviewContainer = document.getElementById("reviewContainer");
    reviewContainer.innerHTML = ""; // 기존에 표시된 리뷰 초기화
  
    // 모든 저장된 리뷰를 가져와서 표시
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("movieReview_")) {
        const reviewObj = JSON.parse(localStorage.getItem(key));
        const reviewElement = document.createElement("div");
        if (reviewObj.movieId === pageId) {
          console.log(reviewObj.movieId);
          reviewElement.innerHTML = `<div class="movie_review_card">
                      <div class="review-body">
                              <h2 class="review-title">${reviewObj.author}</h2>
                              <p class="review-text">${reviewObj.review}</p>
                              <button class="review_card_button" onclick="deleteReview('${key}')">삭제하기</button>
                              <button class="review_card_button" onclick="editReview('${key}')">수정하기</button>
                      </div>
                  </div>`;
          reviewContainer.appendChild(reviewElement);
        }
      }
    }
  }
  
  // 리뷰를 수정하는 함수
  function editReview(key) {
    const password = prompt("리뷰를 수정하려면 비밀번호를 입력하세요:");
    if (password === null) {
      // 사용자가 취소를 선택한 경우
      return;
    }
  
    // 비밀번호 확인
    const reviewObj = JSON.parse(localStorage.getItem(key));
    if (reviewObj.password !== password) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
  
    const newReview = prompt("수정할 리뷰를 입력하세요:");
    if (newReview === null) {
      // 사용자가 취소를 선택한 경우
      return;
    }
  
    // 수정된 리뷰 내용 저장
    reviewObj.review = newReview;
    localStorage.setItem(key, JSON.stringify(reviewObj));
  
    alert("리뷰가 성공적으로 수정되었습니다.");
    displayReviews(); // 수정 후 리뷰 목록을 갱신하여 업데이트
  }