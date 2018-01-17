import './newsItem.less';

const createNewsNode = ({url, title, urlToImage, description, source, publishedAt}) => {
  if (!url || !title) return '';
  const date = publishedAt ? new Date(publishedAt) : '';
  const template =
    `<div class="newsItem">
      <div class="newsItem__info">
        <div class="newsItem__header">
          ${urlToImage ? `<div class="newsItem__image-wrapper"><img src="${urlToImage}"/></div>` : ''}
          <div class="newsItem__title">
            <a href="${url}" target="_blanc">${title}</a>
          </div>
        </div>
        ${description ? `<div class="newsItem__description">${description}</div>` : ''}
      </div>
      ${source && source.name || publishedAt ?
    `<div class="newsItem__public-info">
        ${publishedAt ? `<span>${date.getMonth()+1}.${date.getDate()}.${date.getFullYear()}</span>` : ''}
        ${source && source.name && publishedAt ? `<span class="separator"> | </span>` : ''}
        ${source && source.name ? `<span>${source.name}</span>` : ''}
      </div>` : ''}
    </div>`;
  return template;
};

export default createNewsNode;