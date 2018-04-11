export const template = `
    <div class="container">
        <h1 class="title">Great Todo App</h1>
        <div class='row'>
            <form>
                <input type="text" ng-model='$ctrl.newTodoText' ng-focus='$ctrl.error = ""'/>
                <div ng-show='$ctrl.error'>{{$ctrl.error}}</div>
                <button type="submit"
                        ng-click="$ctrl.addNewTodo($ctrl.newTodoText)">
                      <span ng-show='$ctrl.activeTodo'>Edit</span>
                      <span ng-show='!$ctrl.activeTodo'>Add</span>
                </button>
            </form>
        </div>
        <div class='row'>Show last <input type="number" ng-model='$ctrl.filterDaysCount'/> days</div>
        <div class='row'>
            <span>Sort by</span>
            <select ng-model='$ctrl.sortVal' ng-change='$ctrl.sortTodos()'>
                <option value='firstLetterAsc'>First letter asc</option>
                <option value='firstLetterDesc'>First letter desc</option>
                <option value='dateAsc'>Date asc</option>
                <option value='dateDesc'>Date desc</option>
            </select>
        </div>
        <div class='row'>
            <div class="column column--done">
                <h2>New Todos</h2>
                <div class='item'
                     ng-repeat='todo in $ctrl.notDoneTodos | dayFilter:$ctrl.filterDaysCount'
                     ng-class='$ctrl.activeTodo === todo ? "item--active" : ""'>
                    <div ng-click="$ctrl.setActiveTodo(todo)">{{todo.text}}</div>
                    <div>{{todo.date | date:'MM/dd/yyyy'}}</div>
                    <button ng-click="$ctrl.changeStatus('done', todo)">Mark as done</button>
                </div>
            </div>
            <div class="column">
                <h2>Done Todos</h2>
                <div class='item' ng-repeat='todo in $ctrl.doneTodos | dayFilter:$ctrl.filterDaysCount'>
                    <div ng-click="$ctrl.setActiveTodo(todo)">{{todo.text}}</div>
                    <div>{{todo.date | date:'MM/dd/yyyy'}}</div>
                    <button ng-click="$ctrl.changeStatus('new', todo)">Move to New Todos</button>
                </div>
            </div>
        </div>        
    </div>
`