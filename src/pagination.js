let totalDataCount = 0; //총 데이터의 갯수
let dataCount = 9; //한 페이지에 나타낼 데이터 갯수
let currentPage = 0;
let paginationCount = 10; //화면에 나타낼 페이징 갯수

const pagination = () => {
    //총 게시물 갯수가 9개 이하면 페이징 비활성화 
    if (totalDataCount <= 9) return;

    //총 페이지 갯수 계산. perPage는 한 페이지 당 보여줄 데이터의 갯수
    let totalPage = Math.ceil(totalDataCount / dataCount);
    //현재 페이지에서 보여지는 페이징 그룹
    let currentPagination = Math.ceil(currentPage / paginationCount);

    let lastPageNum = paginationCount * dataCount;
    if (lastPageNum > totalPage) lastPageNum = totalPage;
    let firstPageNum = lastPageNum - (paginationCount - 1) <= 0 ? 1 : lastPageNum - (paginationCount - 1);

    let next = lastPageNum + 1;
    let prev = firstPageNum - 1;

    for (let i = firstPageNum; i <= lastPageNum; i++){
        html += `<button class='pageNum' id = '${i}page'>${i}</button>`
    }

}