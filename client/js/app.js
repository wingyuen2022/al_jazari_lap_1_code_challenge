const key = `AIzaSyDYJMPMgSsp5GduRluEtd86Jd70ijXIXn0`;

async function performSearch(currentUrl) {
    let urlToken = currentUrl.split("?");
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
    googleParameters = `${googleParameters}&alt=json`;
    /*
    q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&relatedSite={relatedSite?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json
    */
    const url = `https://www.googleapis.com/customsearch/v1?key=${key}&cx=017576662512468239146:omuauf_lfve&q=${googleParameters}`;
    await fetch(url)
        .then(r => r.json())
        .then(updateSearchResult)
        .catch(console.warn);
};

function updateSearchResult(searchResult) {
    let error = searchResult.error;
    if (error.code !== undefined && error.code !== null && error.code !== "") {
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
    }
}

module.exports = {
    performSearch
};