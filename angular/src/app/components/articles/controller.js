import { getArticles, addArticle, updateArticle } from './service'

class ArticlesController {
  $onInit() {
    this.articles = getArticles()
    this.showForm = false
    this.clearArticle = {
      title: '',
      content: ''
    }
    this.newArticle = this.clearArticle
    this.activeArticle = ''
  }

  addArticle() {
    addArticle(this.newArticle)
  }

  updateArticle() {
    updateArticle(this.activeArticle, this.newArticle)
  }

  setArticle() {
    if (this.isNewArticle()) {
      this.addArticle()
    } else {
      this.updateArticle()
    }
    this.newArticle = this.clearArticle
    this.activeArticle = ''
  }

  showClearForm() {
    this.activeArticle = ''
    this.newArticle = this.clearArticle
    this.showForm = true
  }

  setActiveArticle(article) {
    this.activeArticle = article
    this.newArticle = {...article}
  }

  isNewArticle() {
    return !!(!this.activeArticle)
  }
}

export default ArticlesController