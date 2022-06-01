const key = `AIzaSyBva5zGAHTWygrORvnbBBTRFxq3YbY29Go`;

async function performSearch() {
    let url = window.location.href;
    let urlToken = url.split("?");
    if (urlToken.length != 2) {
        return;
    }
    parameters = urlToken[1];
    const parametersTokens = parameters.split('&');
    let googleParameters = "";
    parametersTokens.forEach((curParameterToken)=>{
        const nameValuePairs = curParameterToken.split('=');
        const name = nameValuePairs[0];
        const value = nameValuePairs[1];
        if (name === 'keyword') {
            googleParameters = `${value}${googleParameters}`;
            const searchInputText = document.querySelector('#searchAgain');
            searchInputText.setAttribute('placeHolder', '');
            searchInputText.setAttribute('value', value);
        } else {
            googleParameters = `${googleParameters}&${name}=${value}`;
        }
    });
    if (!googleParameters.includes('&start=')) {
        googleParameters = `${googleParameters}&start=1`;
    }
    googleParameters = `${googleParameters}&alt=json`;
    /*
    q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&relatedSite={relatedSite?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json
    */
    const urlToCallGoogle = `https://www.googleapis.com/customsearch/v1?key=${key}&cx=017576662512468239146:omuauf_lfve&q=${googleParameters}`;
    await fetch(urlToCallGoogle)
        .then(r => r.json())
        .then(updateSearchResult)
        .catch(console.warn);
};

function updateSearchResult(searchResult) {
    console.log(searchResult);
    const nextPageButton = document.querySelector('#nextPage');
    const previousPageButton = document.querySelector('#previousPage');
    let error = searchResult.error;
    if (error !== undefined && error !== null) {
        let errorMessage = `${error.code} ${error.message}`;
        document.querySelector('#searchResult').innerHTML = `<span>Unexpected error</span><br><br><span>${errorMessage}</span>`;
        document.querySelector('#searchResultInfo').innerHTML = `About 0 results (0.0 seconds)`;
    } else {
        let htmlCode = '';
        let results = searchResult.items;
        results.forEach((curResult)=>{
            htmlCode = htmlCode + `<div class=\"card p-3\" style=\"width: 60rem;\">`;
            htmlCode = htmlCode + `<div class=\"row\"><div class=\"col\">`;
            htmlCode = htmlCode + `<span>${curResult.htmlFormattedUrl}</span>`;
            htmlCode = htmlCode + `<a href=\"${curResult.link} target=\"_blank\"><h4>${curResult.htmlTitle}</h4><\a>`;
            htmlCode = htmlCode + `<span>${curResult.htmlSnippet}</span>`;
            htmlCode = htmlCode + `</div></div>`;
            htmlCode = htmlCode + `</div>`;
        });
        document.querySelector('#searchResult').innerHTML = htmlCode;
        let information = searchResult.searchInformation;
        document.querySelector('#searchResultInfo').innerHTML = `About ${information.formattedTotalResults} results (${information.formattedSearchTime} seconds)`;

        let queries = searchResult.queries;
        if (queries !== undefined && queries !== null) {
            if (queries.nextPage !== undefined && queries.nextPage !== null) {
                nextPageButton.removeAttribute("hidden"); 
                let nextIndex = queries.nextPage[0].startIndex;
                if (nextIndex > 10) {
                    nextPageButton.addEventListener('click', (e)=>{
                        window.location.href = `${window.location.href}&start=${nextIndex}`;
                        e.preventDefault();
                    });
                }
            } else {
                nextPageButton.setAttribute('hidden', true);
            }
            if (queries.previousPage !== undefined && queries.previousPage !== null) {
                previousPageButton.removeAttribute("hidden"); 
                let previousIndex = queries.previousPage[0].startIndex;
                previousPageButton.addEventListener('click', (e)=>{
                    let curUrl = window.location.href;
                    let tokens = curUrl.split('?');
                    let parameters = tokens[1].split('&');
                    let parviousUrl = '';
                    parameters.forEach((curParameter)=>{
                        let pairs = curParameter.split('=');
                        let name = pairs[0];
                        let value = pairs[1];
                        if (name === 'start') {
                            parviousUrl = `${parviousUrl}&start=${previousIndex}`;
                        } else {
                            parviousUrl = `${parviousUrl}&keyword=${value}`;
                        }
                    });
                    parviousUrl = parviousUrl.replace('&keyword=', '?keyword=');
                    window.location.href = `${parviousUrl}`;
                    e.preventDefault();
                });
            } else {
                previousPageButton.setAttribute('hidden', true);
            }
        }
    }
}

module.exports = {
    performSearch
};