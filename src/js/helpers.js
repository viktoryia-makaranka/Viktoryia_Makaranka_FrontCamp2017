export const getQueryStringParams = (params) => {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
};

export const hideElement = (el) => {
  el.classList.add('hidden');
}

export const showElement = (el) => {
  el.classList.remove('hidden');
}

export const getListNode = (sourceId) => document.querySelector(`.newsList--${sourceId}`);