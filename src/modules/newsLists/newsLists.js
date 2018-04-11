import './newsLists.less';

import { getListNode } from 'App/js/helpers';
import getNews from 'App/services/news.service';
import createNewsNode from '../newsItem/newsItem';

import { dispatch, state: blogs, subscribe } from '../../js/blog';

const fillNewsList = async (sourceId) => {
  const listNode = getListNode(sourceId);
  const sourceData = await getNews(sourceId);
  dispatch('setBlogArticles')(sourceId, sourceData);
  listNode.innerHTML = blogs[sourceId].reduce((htmlText, item) =>
    `${htmlText}${createNewsNode(item)}`, listNode.innerHTML);
};

const toggleNewsList = (sourceId) => {
  const listNode = getListNode(sourceId);
  if (document.querySelector(`input[value="${sourceId}"]`).checked) {
    fillNewsList(sourceId);
    listNode.show();
  } else {
    listNode.hide();
  }
};

subscribe(toggleNewsList);

//Is it Mediator Pattern?
export default toggleNewsList;
