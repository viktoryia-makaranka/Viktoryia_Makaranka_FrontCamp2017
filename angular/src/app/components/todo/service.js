export let todos = [
  {
    "text": "TODO1111111111111",
    "date": new Date('05-05-2017'),
    "status": "new"
  },
  {
    "text": "TODO22222222222222",
    "date": new Date('12-05-2017'),
    "status": "done"
  }
]

export const getDoneTodos = () => {
  return todos.filter(todo => todo.status === 'done')
}

export const getNotDoneTodos = () => {
  return todos.filter(todo => todo.status !== 'done')
}

export const addTodo = (todoText) => {
  const todo = {
    text: todoText,
    date: new Date(),
    status: 'new'
  }
  todos.push(todo)
  return todos
}

export const removeTodo = (todo) => {
  const index = todos.indexOf(todo)
  todos.splice(index, 1)
  return todos
}

export const changeTodoStatus = (newStatus, todo) => {
  const index = todos.indexOf(todo)
  todos[index].status = newStatus
  return todos
}

export const updateTodo = (todo, text) => {
  const index = todos.indexOf(todo)
  todos[index].text = text
  return todos
}

export const sorting = (property, order, arr) => {
  arr.sort((a, b) => {
    const aProp = a[property].toLowerCase ? a[property].toLowerCase() : a[property]
    const bProp = b[property].toLowerCase ? b[property].toLowerCase() : b[property]
    const multiplicator = order === 'asc' ? 1 : -1
    return aProp > bProp ? 1*multiplicator : aProp === bProp ? 0 : -1*multiplicator
  })
}