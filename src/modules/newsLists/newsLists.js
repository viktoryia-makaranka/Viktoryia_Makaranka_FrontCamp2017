import './newsLists.less';

import { API_KEY, API_URL, SOURCES, NEWS_LISTS, ERROR_FIELD, LOADING_MASK } from 'App/js/const';
import { getQueryStringParams, showElement, hideElement, getListNode } from 'App/js/helpers';
import createNewsNode from '../newsItem/newsItem';

const fillNewsList = (sourceId, data) => {
  const listNode = getListNode(sourceId);
  const sourceData = data.filter(sourceItem => sourceItem.source.id === sourceId);
  listNode.innerHTML = sourceData.reduce((htmlText, item) => {
    return `${htmlText}${createNewsNode(item)}`;
  }, listNode.innerHTML);
  if (document.querySelector(`input[value="${sourceId}"]`).checked) showElement(listNode);
};

const getNews = (params) => fetch(`${API_URL}?${getQueryStringParams(params)}`, { mode: 'cors' });

const fetchNews = () => {
  showElement(LOADING_MASK);

  const params = {
    'language': 'en',
    'sources': SOURCES.join(', '),
    'apiKey': API_KEY,
  };

  getNews(params).then(resp => resp.json())
    .then(resp => {
      SOURCES.forEach((source) => {
        fillNewsList(source, resp.articles);
      });
      hideElement(ERROR_FIELD);
      showElement(NEWS_LISTS);
    })
    .catch(err => {
      hideElement(NEWS_LISTS);
      showElement(ERROR_FIELD);
    })
    .finally(() => hideElement(LOADING_MASK));
};

export default fetchNews;