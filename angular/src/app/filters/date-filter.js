angular.
module('app').
filter('dayFilter', () => {
  return (todos, daysCount) => {
    if (!daysCount) return todos
    const minimumDate = new Date() - 1000 * 60 * 60 * 24 * daysCount
    return todos.filter(todo => todo.date >= minimumDate)
  };
});