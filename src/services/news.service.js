import { getQueryStringParams, fetchDecorator } from 'App/js/helpers';
import { API_KEY, API_URL } from 'App/js/const';

const news = {};

const params = {
  'language': 'en',
  'apiKey': API_KEY,
};

const getNews = async (sourceId) => {
  if (!news[sourceId]) {
    const stringParams = getQueryStringParams({ ...params, 'sources': sourceId });
    const fetchNews = () => fetch(`${API_URL}?${stringParams}`, { mode: 'cors' })
      .then((response) => response.json())
      .then((resp) => news[sourceId] = resp.articles);
    await fetchDecorator(fetchNews);
  }

  return news[sourceId];
};

export default getNews;
