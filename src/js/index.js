require('element-dataset').default();

import { NEWS_LISTS_BUTTONS } from './const';

import 'App/less/styles.less';

const downloadNews = e => {
  NEWS_LISTS_BUTTONS.removeEventListener('click', downloadNews);
  import(/* webpackChunkName: 'fetchNews' */ 'App/modules/newsLists/newsLists')
    .then(module => {
      const toggleNewsList = module.default;
      toggleNewsList(e.target.dataset.id);
      const nodesArray = [...document.querySelectorAll('input[name="newsSource"]')];
      nodesArray.forEach(sourceNode => {
        sourceNode.addEventListener('change', ({target}) => {
          toggleNewsList(target.value);
        });
      });
    });
};

document.addEventListener('DOMContentLoaded', () => {
  NEWS_LISTS_BUTTONS.addEventListener('click', downloadNews);
});


//Prototype Creational Pattern
Object.defineProperties(Element.prototype, {
  'show': {
    enumerable: false,
    value: function() {
      this.classList.remove('hidden');
      return this;
    },
  },
  'hide': {
    enumerable: false,
    value: function() {
      this.classList.add('hidden');
      return this;
    },
  },
});

