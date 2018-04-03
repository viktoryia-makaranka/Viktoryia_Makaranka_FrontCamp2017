export default (state) => ({
  setBlogArticles: (blogId, articles) => {
    state = {
      ...state,
      [blogId]: articles
    };
    return state;
  }
});