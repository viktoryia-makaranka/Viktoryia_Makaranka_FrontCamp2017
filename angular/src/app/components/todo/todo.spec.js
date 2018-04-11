import app from '../../app'
import { addTodo, updateTodo, todos, sorting } from './service'


describe('app', () => {

  describe('TodoCtrl', () => {
    let ctrl
    let activeTodo

    beforeEach(() => {
      angular.mock.module(app)

      activeTodo = {
        text: 'Lorem Ipsum text Lorem Ipsum text',
        date: new Date(),
        status: 'new'
      }

      angular.mock.inject(($componentController, $rootScope) => {
        const scope = $rootScope.$new()
        ctrl= $componentController('todoList', { $scope: scope })
      })

      ctrl.todos = todos
      ctrl.activeTodo = ''
      ctrl.addNewTodo = addTodo
      ctrl.updateTodo = updateTodo
      ctrl.sortTodos = sorting
    })

    it('setActive Todo should change newTodoText to the same one', () => {
      ctrl.newTodoText = `${activeTodo.text}abc`
      ctrl.setActiveTodo(activeTodo)
      expect(ctrl.newTodoText).toBe(activeTodo.text)
    })

    it('add new Todo with long text', () => {
      ctrl.addNewTodo('Lorem Ipsum text Lorem Ipsum text  Lorem Ipsum text')
      expect(ctrl.todos.length).toBe(3)
    })

    it('should not change count during the update', () => {
      ctrl.updateTodo(ctrl.todos[1], ctrl.todos[0])
      expect(ctrl.todos.length).toBe(3)
    })

    it('sort desc by text', () => {
      ctrl.doneTodos = [
        { text: 'A' },
        { text: 'B' },
        { text: 'c' }
      ]
      ctrl.sortTodos('text', 'desc', ctrl.doneTodos)
      expect(ctrl.doneTodos[0].text).toBe('c')
    })

    it('sort asc by date', () => {
      ctrl.doneTodos = [
        { date: 5000 },
        { date: 50000 },
        { date: 500 }
      ]
      ctrl.sortTodos('date', 'desc', ctrl.doneTodos)
      expect(ctrl.doneTodos[0].date).toBe(50000)
    })


  })
})