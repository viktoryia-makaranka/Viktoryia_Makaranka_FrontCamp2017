require('element-dataset').default();

import { getListNode } from './helpers';
import { NEWS_LISTS_BUTTONS } from './const';

import 'App/less/styles.less';

const downloadNews = e => {
  NEWS_LISTS_BUTTONS.removeEventListener('click', downloadNews);
  import(/* webpackChunkName: 'fetchNews' */ 'App/modules/newsLists/newsLists')
    .then(module => {
      const fetchNews = module.default;
      fetchNews();
      const nodesArray = [...document.querySelectorAll('input[name="newsSource"]')];
      nodesArray.forEach(sourceNode => {
        sourceNode.addEventListener('change', ({target}) => {
          const listNode = getListNode(target.value);
          if (listNode) listNode.classList.toggle('hidden');
        });
      });
    });
};

document.addEventListener('DOMContentLoaded', () => {
  NEWS_LISTS_BUTTONS.addEventListener('click', downloadNews);
});