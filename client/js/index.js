// Global result variable

const searchForm = document.querySelector('#search-form');
const searchResultForm = document.querySelector('#search-result-form');

if (typeof searchForm !== 'undefined' && !!searchForm) {
    searchForm.addEventListener('submit', (e)=>{
        const keyword = e.target.searchKeyword.value;
        window.location.href = `./pages/search.html?keyword=${keyword}`;
        e.preventDefault();
    });
}
if (typeof searchResultForm !== 'undefined' && !!searchResultForm ) {
    const clearSearchButton = document.querySelector('#clear-search');
    clearSearchButton.addEventListener('click', ()=>{
        window.location.href = `search.html`;
        document.querySelector('#searchAgain').value = "";
        document.querySelector('#searchAgain').placeHolder = "Anything";
        document.querySelector('#searchResult').innerHTML = "";
    });
    const searchAgainButton = document.querySelector('#search-again');
    searchAgainButton.addEventListener('click', (e)=>{
        const keyword = document.querySelector('#searchAgain').value;
        if (keyword !== "") {
            window.location.href = `search.html?keyword=${keyword}`;
            e.preventDefault();
            // Exit
        }
    });
    performSearch();
}