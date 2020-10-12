import React from 'react';
import TodoContainer from './components/TodoContainer';
import TodoForm from './components/TodoForm';
import './App.css';
const baseURL = `http://localhost:4000/todos/`

class App extends React.Component {
  state = {
    todos: []
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
    this.setState({
      todos: [...this.state.todos, newTodo]
    })

    fetch(baseURL, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(newTodo)
    })
  }

  deleteTodo = (id) => {
    let filtered = this.state.todos.filter(todo => todo.id !== id)
    this.setState({
      todos: filtered
    })

    fetch(`${baseURL}${id}`, {method: "DELETE"})
  }

  render() {
    return (
      <div className="App">
        <h1>Todo App</h1>
        <TodoForm addTodo={this.addTodo} />
        <TodoContainer deleteTodo={this.deleteTodo} todos={this.state.todos} />
      </div>
    );
  }
}

export default App;