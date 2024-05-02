let totalPostCount = 0;

const pagination = () => {
    //총 게시물 갯수가 9개 이하면 페이징 비활성화 
    if (totalPostCount <= 9) return;

    let totalPage = Math.ceil(postCount / 20);
    //현재 페이지에서 보여지는 페이징 그룹
    let pageGroup = Math.ceil(currentPage / 10);

    let lastPage = pageGroup * 10;
    if (lastPage > totalPage) lastPage = totalPage;
    let firstPage = lastPage - (10 - 1) <= 0 ? 1 : lastPage - (10 - 1);

    const fragmentPage = document.createDocumentFragment();

    if (prev > 0) {

    }

}