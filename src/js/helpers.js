import { ERROR_FIELD, LOADING_MASK } from 'App/js/const';

export const getQueryStringParams = (params) => {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
};

export const getListNode = (sourceId) => document.querySelector(`.newsList--${sourceId}`);

//Decorator Structural Pattern
export const fetchDecorator = async (fetchMethod) => {
  LOADING_MASK.show();
  try {
    await fetchMethod();
    ERROR_FIELD.hide();
  } catch (err) {
    ERROR_FIELD.show();
  } finally {
    LOADING_MASK.hide();
  }
};