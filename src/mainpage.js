// RSS 피드 URL
const rssFeedUrl = 'https://api.newswire.co.kr/rss/industry/1206';

// 뉴스를 가져와서 화면에 표시하는 함수
const fetchNewsFromRss = async () => {
    try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssFeedUrl}`);
        const data = await response.json();

        if (data.status === 'ok') {
            displayNews(data.items);
        } else {
            console.error('RSS 피드를 가져오는 데 문제가 발생했습니다.');
        }
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
    }
};

// 뉴스를 화면에 표시하는 함수
const displayNews = (items) => {
    const newsContainer = document.getElementById('newsContainer');

    items.forEach(item => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');

        const title = document.createElement('h2');
        title.textContent = item.title;

        const description = document.createElement('div');
        description.innerHTML = item.description;

        // 이미지 제거
        const images = description.querySelectorAll('img');
        images.forEach(image => {
            image.parentNode.removeChild(image);
        });

        // 뉴스 전체 영역을 클릭했을 때 이벤트 처리
        newsItem.addEventListener('click', () => {
            window.open(item.link, '_blank'); // 새 탭에서 링크 열기
        });

        newsItem.appendChild(title);
        newsItem.appendChild(description);

        newsContainer.appendChild(newsItem);
    });
};

// 특정 구역 스크롤로 뉴스 가져오기
const newsContainer = document.getElementById('newsContainer');
newsContainer.addEventListener('scroll', () => {
    const scrollPosition = newsContainer.scrollTop;
    const containerHeight = newsContainer.clientHeight;
    const contentHeight = newsContainer.scrollHeight;

    if (scrollPosition + containerHeight >= contentHeight) {
        fetchNewsFromRss();
    }
});

// 페이지 로드 시 초기 뉴스 가져오기
fetchNewsFromRss();