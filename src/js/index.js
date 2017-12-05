import '../less/styles.less';

require('element-dataset').default();

import { API_KEY, API_URL } from './const';

const sources = ['bbc-news', 'abc-news', 'google-news'];

const createNewsNode = ({url, title, urlToImage, description, source, publishedAt}) => {
    if (!url || !title) return '';
    const date = publishedAt ? new Date(publishedAt) : '';
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
        `<div class="newsItem__public-info">
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

const fillNewsList = (sourceId, data) => {
    const listNode = document.querySelector(`.newsList--${sourceId}`);
    const sourceData = data.filter(sourceItem => sourceItem.source.id === sourceId);
    listNode.innerHTML = sourceData.reduce((htmlText, item) => {
        return `${htmlText}${createNewsNode(item)}`;
}, listNode.innerHTML);
};

const getQueryStringParams = (params) => {
    let query = [];
    for (let p in params) {
        query.push(`${encodeURIComponent(p)}=${encodeURIComponent(params[p])}`);
    }
    return query.join('&');
};

const fetchNews = () => {
    document.querySelector('.loading-mask').classList.remove('hidden');
    const params = {
        'language': 'en',
        'sources': sources.join(', '),
        'apiKey': API_KEY
    };
    fetch(`${API_URL}?${getQueryStringParams(params)}`, { mode: 'cors' })
        .then(resp => resp.json())
        .then(resp => {
            sources.forEach((source) => {
                fillNewsList(source, resp.articles);
            });
            document.querySelector('.newsLists').classList.remove('hidden');
            document.querySelector('.requestError').classList.add('hidden');
            document.querySelector('.loading-mask').classList.add('hidden');
        })
        .catch(err => {
           document.querySelector('.newsLists').classList.add('hidden');
           document.querySelector('.requestError').classList.remove('hidden');
           document.querySelector('.loading-mask').classList.add('hidden');
        });
};

window.onload = () => {
    fetchNews();
    const nodesArray = [...document.querySelectorAll('input[name="newsSource"]')];
    nodesArray.forEach(node => {
        node.addEventListener('change', ({ target }) => {
            const el = document.querySelector(`.newsList--${target.value}`);
            if (el) el.classList.toggle('hidden');
        });
    });
};