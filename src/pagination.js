import { fetch_MovieData } from './cinescript.js';
//총 데이터 개수
let totalDataCount = Object.keys(fetch_MovieData.id).length;

// 버튼 클릭이벤트
export const clickBtnEvent = () => {
    document.querySelector('btn__first').addEventListener('click', () => {
        changePage("first");
    });
    document.querySelector('btn__end').addEventListener('click', () => {
        changePage("end");
    });
    document.querySelector('btn__prev').addEventListener('click', () => {
        if (currentPage > 1) currentPage -= 1;
        changePage("prev");
    });
    document.querySelector('btn__next').addEventListener('click', () => {
        if (currentPage < totalPageCount) currentPage += 1;
        changePage("next");
    });
    document.querySelectorAll("#current__page").addEventListener("click", (e) => {
        console.log(e.target.value);
        setPagination(e.target.value);
    });
}

// 각 페이지버튼 상태변화
export const changePage = (page) => {

    let pageStatus = parseInt(document.querySelectorAll(".active ").innerText);

    if (page === "first") page = "1";
    else if (page === "end") page = totalPageCount;
    else if (page === "prev") page = (pageStatus - 1) < 1 ? pageStatus : (pageStatus - 1);
    else if (page === "next") page = (pageStatus + 1) < totalPageCount ? totalPageCount : (pageStatus + 1);
    
    if (pageStatus != page) setPagination(page);
}


export const setPagination = (page) => {

    let dataCount = 9; //한 페이지에 나타낼 데이터 개수
    let perPageGroup = 10; //화면에 나타낼 페이징 갯수
    let firstPage = 1; //페이지가 렌더링되면 첫 페이지부터

    if (page == null || page == 0) page = firstPage;
    //총 게시물 개수가 9개 이하면 페이징 비활성화 
    if (totalDataCount <= dataCount ) return;
    //총 페이지 개수 계산. perPage는 한 페이지 당 보여줄 데이터의 갯수
    let totalPageCount = Math.ceil(totalDataCount / dataCount);
    //페이징그룹
    let paginationGroup = Math.ceil(currentPage / perPageGroup);
    //현재페이지 튜플의 끝 번호
    let lastPage = paginationGroup * perPageGroup; 
    if (lastPage > totalPageCount) lastPage = totalPageCount;
    //현재페이지 튜플 위치
    let currentPage = lastPage - 4;
    //현재페이지 튜플의 시작번호
    let startPage = lastPage - (perPageGroup - 1) <= 0 ? 1 : lastPage - (perPageGroup - 1);

    initializeBtn(startPage, lastPage, paginationGroup);
}

//초기화
export const initializeBtn = (startPage, lastPage, paginationGroup) => {
    let pageGroup = document.querySelector('#tuple').innerHTML = "";
    for (let i = startPage; i <= lastPage; i++){
        if(pageGroup.classList.toggle() == false) pageGroup.classList.add(paginationGroup);
        pageGroup.innerHTML += `<span class='${i}page' id='current__page' >${i}</span>`;
    }
}

//현재 페이지버튼 활성화
export const currentPageActive = () => {
    document.querySelector('group__page').forEach((item) => {
        let text = item.querySelector(`'.${item}page'`).innerText;
        if (text.includes(`${item}`)) item.classList.add("active");
        else item.classList.remove("active");
    });
};
