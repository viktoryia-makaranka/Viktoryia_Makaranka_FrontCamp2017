export const template = `
    <div class="container">
        <h1 class="title">Articles List</h1>
        <div class="row">(contains {{$ctrl.articles.length}} articles)</div>
        <hr>
        <div class="column">
            <add-new-button show-clear-form="$ctrl.showClearForm"></add-new-button>
            <add-article ng-show="$ctrl.showForm" set-article="$ctrl.setArticle" article="$ctrl.newArticle" is-new-article="$ctrl.isNewArticle()"></add-article>
        </div>
        <hr>
        <div class="column">
            <div class="row" ng-repeat="article in $ctrl.articles" ng-click="$ctrl.setActiveArticle(article)">{{article.title}}</div>
        </div>        
    </div>
`