import {fetch_MovieData} from './cinescript.js';
const paginationContainer = document.querySelector('.pagination__container');
const spanPage = document.querySelectorAll(".current__page");
const divPage = document.querySelector('btn__page');
const prevBtn = document.querySelector('btn__prev');
const nextBtn = document.querySelector('btn__next');
let totalDataCount = Object.keys(fetch_MovieData.id).length; //총 데이터의 갯수
let dataCount = 9; //한 페이지에 나타낼 데이터 갯수
let totalPageCount = 0;
let currentPage = 1;
let perPageGroup = 10; //화면에 나타낼 페이징 갯수
let currentPagination = 0;
let startPageNum = 0;
let endPageNum = 0;


export const pagination = () => {

    //총 게시물 개수가 9개 이하면 페이징 비활성화 
    if (totalDataCount <= dataCount ) return;

    //총 페이지 개수 계산. perPage는 한 페이지 당 보여줄 데이터의 갯수
    totalPageCount = Math.ceil(totalDataCount / dataCount);
    //현재 페이지에서 보여지는 페이징 그룹
    currentPagination = Math.ceil(currentPage / perPageGroup);

    endPageNum = perPageGroup * dataCount;
    if (endPageNum > totalPage) endPageNum = totalPage;
    startPageNum = endPageNum - (perPageGroup - 1) <= 0 ? 1 : endPageNum - (perPageGroup - 1);

}

//초기화
export const setPageBtn = () => {
    paginationContainer.innerHTML = "";
    for (let i = startPageNum; i <= endPageNum; i++){
        pageBtn.innerHTML += `<span class='current__page' id='${i}page' >${i}</span>`;
    }
}

//현재 페이지버튼 활성화
export const currentPageActive = () => {
    divPage.forEach((item) => {
        let text = item.querySelector(`'#${item}page'`).innerText;
        if (text.includes(`${item}`)) item.classList.add("active")
        else item.classList.remove("active");
    });
}


export const selectPageBtn = (page) => {
    page = page == null ? 1 : page;
    //첫 페이지에서 나타나는 페이징
    let firstPage = (page - 1) * perPageGroup + 1;
    //마지막 페이지에서 나타나는 페이징
    let lastPage = firstPage + perPageGroup - 1;
    //총 페이지 개수보다 마지막 페이지 번호가 더 크면 총 페이지 개수를 마지막 페이지 번호로
    lastPage = lastPage > totalPageCount ? totalPageCount : lastPage;
}



// 각 페이지버튼 상태변화
export const changePage = (page) => {

    let pageStatus = parseInt(document.querySelectorAll(".current__page .active ").innerText);

    if (page === "first") page = "1";
    else if (page === "last") page = totalPageCount;
    else if (page === "prev") page = (pageStatus - 1) < 1 ? pageStatus : (pageStatus - 1);
    else if (page === "next") page = (pageStatus + 1) < totalPageCount ? totalPageCount : (pageStatus + 1);
    
    if (pageStatus != page) selectPage(page);
}

// 버튼 클릭이벤트
export const clickBtnEvent = () => {
    document.querySelectorAll(".current__page").addEventListener("click", (e) => {
        console.log(e.target);
        selectPage(e.target);
    });
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) currentPage -= 1;
    });
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPageCount) currentPage += 1;
    });
}
