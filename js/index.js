const API_KEY = '60b3be23ad924ebbb2e942ceeb1013de';
const API_URL = 'https://newsapi.org/v2/top-headlines';
const sources = ['bbc-news', 'abc-news', 'google-news'];

const params = {
    'language': 'en',
    'sources': sources.join(', '),
    'apiKey': API_KEY
};

const getQueryStringParams = (params) => {
    let query = [];
    for (let p in params) {
        query.push(`${encodeURIComponent(p)}=${encodeURIComponent(params[p])}`);
    }
    return query.join('&');
};

let articles = [];

fetch(`${API_URL}?${getQueryStringParams(params)}`)
    .then(resp => resp.json(), err => alert('Something went wrong'))
    .then(resp => {
        articles = resp.articles;
    });

const createNewsNode = ({url, title, urlToImage, description, source, publishedAt}) => {
    if (!url || !title) return '';
    return `<div class="newsItem">
        ${urlToImage ?
        `<div class="newsItem__image-wrapper">
            <img src="${urlToImage}"/>
        </div>`
        : ''}
        <div class="newsItem__info">
            <a class="newsItem__title" href="${url}">${title}</a>
            ${source && source.name || publishedAt ?
                `<div class="newsItem_public-info">
                    ${source && source.name ?
                        `<span>${source.name}</span>`
                    : ''}
                    ${source && source.name && publishedAt ?
                        `<span class="separator"> | </span>`
                    : ''}
                    ${publishedAt ?
                        `<span>${publishedAt}</span>`
                    : ''}
                </div>`
            : ''}
            ${description ?
            `<div class="newsItem__description">${description}</div>`
            : ''}            
        </div>
    </div>`;
};

const createNewsList = (sourceId, data) => {
    let listNode = document.querySelector(`.newsList--${sourceId}`);
    if (!listNode) {
        listNode = document.createElement(`<div class="newsList newsList--${sourceId}"></div>`);
        document.querySelector('.newsLists').appendChild(listNode);
    }
    const sourceData = data.filter(sourceItem => sourceItem.source.id === sourceId);
    listNode.innerHTML = sourceData.reduce((htmlText, item) => {
        return `${htmlText}${createNewsNode(item)}`;
    }, '');
};



