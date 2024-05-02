import {fetch_MovieData} from './cinescript.js';
const paginationContainer = document.querySelector('.pagination__container');
const allPageBtn = document.querySelectorAll('.current__page');
const pageBtn = document.querySelector('btn__page');
const prevBtn = document.querySelector('btn__prev');
const nextBtn = document.querySelector('btn__next');
let totalDataCount = Object.keys(fetch_MovieData.id).length; //총 데이터의 갯수
let dataCount = 9; //한 페이지에 나타낼 데이터 갯수
let totalPageCount = 0;
let currentPage = 1;
let paginationCount = 10; //화면에 나타낼 페이징 갯수
let currentPagination = 0;


export const pagination = () => {

    //총 게시물 개수가 9개 이하면 페이징 비활성화 
    if (totalDataCount <= dataCount) return;

    //총 페이지 개수 계산. perPage는 한 페이지 당 보여줄 데이터의 갯수
    totalPageCount = Math.ceil(totalDataCount / dataCount);
    //현재 페이지에서 보여지는 페이징 그룹
    currentPagination = Math.ceil(currentPage / paginationCount);

    let lastPageNum = paginationCount * dataCount;
    if (lastPageNum > totalPage) lastPageNum = totalPage;
    let firstPageNum = lastPageNum - (paginationCount - 1) <= 0 ? 1 : lastPageNum - (paginationCount - 1);

}

//초기화
export const setPageBtn = () => {
    paginationContainer.innerHTML = "";
    for (let i = firstPageNum; i <= lastPageNum; i++){
        pageBtn.innerHTML += `<span class='current__page' id='${i}page' >${i}</span>`;
    }
}

//페이지 버튼 클릭이벤트리스너
export const clickPageBtn = () => {
    allPageBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.target.innerHTML = btn;
        });
    });
}

//이전, 다음 버튼 클릭이벤트리스너
export const clickPrevNextBtn = () => {

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) currentPage -= 1;
    });
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPageCount) currentPage += 1;
    });
}