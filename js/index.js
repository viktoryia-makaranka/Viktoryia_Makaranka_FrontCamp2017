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
let loading = false;

const fetchNews = () => {
    if (loading) return;
    loading = true;
    document.querySelector('.loading-mask').classList.remove('hidden');
    fetch(`${API_URL}?${getQueryStringParams(params)}`, { mode: 'cors' })
        .then(resp => resp.json())
        .then(resp => {
            articles = resp.articles;
            document.querySelector('.newsLists').classList.remove('hidden');
            document.querySelector('.requestError').classList.add('hidden');
            document.querySelector('.loading-mask').classList.add('hidden');
            loading = false;
        })
        .catch(err => {
           document.querySelector('.newsLists').classList.add('hidden');
           document.querySelector('.requestError').classList.remove('hidden');
           document.querySelector('.loading-mask').classList.add('hidden');
           loading = false;
        });
};

const createNewsNode = ({url, title, urlToImage, description, source, publishedAt}) => {
    if (!url || !title) return '';
    date = publishedAt ? new Date(publishedAt) : '';
    return `<div class="newsItem">
        <div class="newsItem__info">
            <div class="newsItem__header">
                ${urlToImage ?
                        `<div class="newsItem__image-wrapper">
                            <img src="${urlToImage}"/>
                        </div>`
                        : ''}
                <a class="newsItem__title" href="${url}" target="_blanc">${title}</a>
            </div>
            ${description ?
            `<div class="newsItem__description">${description}</div>`
            : ''}
        </div>
        ${source && source.name || publishedAt ?
            `<div class="newsItem_public-info">
                ${publishedAt ?
                    `<span>${date.getMonth()+1}.${date.getDate()}.${date.getFullYear()}</span>`
                : ''}
                ${source && source.name && publishedAt ?
                    `<span class="separator"> | </span>`
                : ''}
                ${source && source.name ?
                    `<span>${source.name}</span>`
                : ''}
            </div>`
        : ''}
    </div>`;
};

const createNewsList = (sourceId, data) => {
    let listNode = document.querySelector(`.newsList--${sourceId}`);

    if (!listNode) {
        listNode = document.createElement('div');
        listNode.classList = `newsList newsList--${sourceId}`;
        document.querySelector('.newsLists').appendChild(listNode);
        const sourceData = data.filter(sourceItem => sourceItem.source.id === sourceId);
        listNode.innerHTML = sourceData.reduce((htmlText, item) => {
            return `${htmlText}${createNewsNode(item)}`;
        }, '');
    } else {
        listNode.classList.toggle('hidden');
    }
};

window.onload = () => {
    fetchNews();
    document.querySelector('.newsListsButtons').onclick = ({ target }) => {
        if (document.querySelector('.requestError').classList.contains('hidden')) {
            target.classList.toggle('newsListButton--active');
            createNewsList(target.dataset.id, articles);
        } else {
            fetchNews();
        }

    };
};