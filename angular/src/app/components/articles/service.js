export let articles = [
  {
    "title": "Article 1",
    "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "date": new Date('05-12-2017')
  },
  {
    "title": "Article 2",
    "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "date": new Date('01-01-2018')
  }
]

export const getArticles = () => articles

export const addArticle = ({ content, title}) => {
  const article = {
    title,
    content,
    date: new Date(),
  }
  articles.push(article)
  return articles
}


export const updateArticle = (article, newArticle) => {
  const index = articles.indexOf(article)
  articles[index] = newArticle
  return articles
}
