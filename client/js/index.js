const searchForm = document.querySelector('#search-form');
const searchResultForm = document.querySelector('#search-result-form');

if (typeof searchForm !== 'undefined' && !!searchForm) {
    const searchButton = document.querySelector('#search');
    searchButton.addEventListener('click', (e)=>{
        const keyword = document.querySelector('#keyword').value;
        window.location.href = `./pages/search.html?keyword=${keyword}`;
        e.preventDefault();
        // Exit
    });
    const luckyButton = document.querySelector('#lucky');
    luckyButton.addEventListener('click', (e)=>{
        const keyword = document.querySelector('#keyword').value;
        window.location.href = `./pages/search.html?keyword=${keyword}&lucky=true`;
        e.preventDefault();
        // Exit
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