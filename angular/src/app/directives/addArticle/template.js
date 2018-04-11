export const template = `
  <form name="addArticleForm" ng-submit="setArticle(article)" novalidate>
    <input type="text" name='title' ng-model='article.title' required validator/>
    <textarea ng-model='article.content' name='content' required validator></textarea>
    <input type='submit' ng-value='isNewArticle ? "Add" : "Edit"' ng-disabled='addArticleForm.$invalid'/>
  </form>
`
