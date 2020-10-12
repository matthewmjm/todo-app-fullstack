import React from 'react';
import TodoContainer from './components/TodoContainer';
import TodoForm from './components/TodoForm';
import SignUpForm from './components/SignUpForm'
import './App.css';
import {patchTodo, postTodo, destroyTodo} from './helpers/index'
const baseURL = `http://localhost:4000/todos/`

class App extends React.Component {
  state = {
    todos: [],
    user: {},
    alerts: []
  }

  componentDidMount() {
    this.getTodos();
  }
  
  getTodos = () => {
    fetch(baseURL)
      .then(response => response.json())
      .then(results => this.setState({todos:results}))
  }

  addTodo = (newTodo) => {
    this.setState({todos: [...this.state.todos, newTodo]})
    postTodo(newTodo)
  }

  updateTodo = (updatedTodo) => {
    let todos = this.state.todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo)
    this.setState({todos})
    patchTodo(updatedTodo)
  }

  deleteTodo = (id) => {
    let filtered = this.state.todos.filter(todo => todo.id !== id)
    this.setState({todos: filtered})
    destroyTodo(id)
  }

  signUp = (user) => {
    fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({user})
    })
    .then(response => response.json())
    .then(response => {
      if(response.errors){
        this.setState({alerts: response.errors})
      }
      else {
        this.setState({user: response.user, alerts: ["User successfully created!"]})
      }
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Todo App</h1>
        <SignUpForm signUp={this.signUp} alerts={this.state.alerts} />
        {/* <TodoForm addTodo={this.addTodo} /> */}
        <TodoForm submitAction={this.addTodo} />
        <TodoContainer updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} todos={this.state.todos} />
      </div>
    );
  }
}

export default App;