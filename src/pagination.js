import {fetch_MovieData} from './cinescript.js';
const paginationContainer = document.querySelector('.pagination__container');
const allPageBtn = document.querySelectorAll('.current__page');
const ul = document.querySelector('ul');
let totalDataCount = Object.keys(fetch_MovieData.id).length; //총 데이터의 갯수
let dataCount = 9; //한 페이지에 나타낼 데이터 갯수
let currentPage = 1;
let paginationCount = 10; //화면에 나타낼 페이징 갯수


export const pagination = () => {

    //총 게시물 갯수가 9개 이하면 페이징 비활성화 
    if (totalDataCount <= dataCount) return;

    //총 페이지 갯수 계산. perPage는 한 페이지 당 보여줄 데이터의 갯수
    let totalPage = Math.ceil(totalDataCount / dataCount);
    //현재 페이지에서 보여지는 페이징 그룹
    let currentPagination = Math.ceil(currentPage / paginationCount);

    let lastPageNum = paginationCount * dataCount;
    if (lastPageNum > totalPage) lastPageNum = totalPage;
    let firstPageNum = lastPageNum - (paginationCount - 1) <= 0 ? 1 : lastPageNum - (paginationCount - 1);

    let next = lastPageNum + 1;
    let prev = firstPageNum - 1;
}

//초기화
export const initializePageNum = () => {
    paginationContainer.innerHTML = "";
    for (let i = firstPageNum; i <= lastPageNum; i++){
        paginationContainer.innerHTML += `<span class='current__page'>${i}</span>`;
    }
}

//페이지 버튼 클릭이벤트리스너
export const clickNumBtn = () => {
    // allPageBtn.forEach()
}