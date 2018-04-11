import { getDoneTodos, getNotDoneTodos, addTodo, changeTodoStatus, updateTodo, sorting } from './service'

export function controller() {
  this.updateState = () => {
    this.doneTodos = getDoneTodos()
    this.notDoneTodos = getNotDoneTodos()
  }

  this.changeStatus = (newStatus, todo) => {
    changeTodoStatus(newStatus, todo)
    this.updateState()
  }

  this.activeTodo = ''
  this.sortVal = 'firstLetterAsc'

  this.sortTodos = () => {
    switch (this.sortVal) {
      case 'firstLetterAsc':
        sorting('text', 'asc', this.doneTodos)
        sorting('text', 'asc', this.notDoneTodos)
        break
      case 'firstLetterDesc':
        sorting('text', 'desc', this.doneTodos)
        sorting('text', 'desc', this.notDoneTodos)
        break
      case 'dateAsc':
        sorting('date', 'asc', this.doneTodos)
        sorting('date', 'asc', this.notDoneTodos)
        break
      case 'dateDesc':
        sorting('date', 'desc', this.doneTodos)
        sorting('date', 'desc', this.notDoneTodos)
        break
      default:
        sorting('date', 'desc', this.doneTodos)
    }
  }

  this.setActiveTodo = (todo) => {
    this.activeTodo = todo
    this.newTodoText = todo.text
  }

  this.updateState()
  this.newTodoText = this.activeTodo ? this.activeTodo.text : ''
  this.error = ''
  this.filterDaysCount = ''

  this.addNewTodo = (text) => {
    if (!text || text.length < 21) {
      this.error = 'The minimum length of a todo text: 20 symbols'
      return
    }
    if (this.activeTodo) {
      updateTodo(this.activeTodo, text)
    } else {
      addTodo(text)
    }
    this.activeTodo = ''
    this.newTodoText = ''
    this.updateState()
    this.sortTodos()
  }
}