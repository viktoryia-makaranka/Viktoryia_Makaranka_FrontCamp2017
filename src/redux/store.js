export default class State {
  static instance;

  constructor(reducer, initialState) {
    if (instance) return instance;
    this.state = initialState || {};
    this.reducer = reducer(this.state);
    this.listeners = [];
  }

  dispatch(action) {
    if (this.reducer[action]) {
      this.state = this.reducer[action](this.state);
      this.listeners.forEach(listener => listener());
    }
    return action;
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  unsubscribe(removableListener) {
    this.listeners = this.listeners.filter(listener => listener !== removableListener);
  }
}