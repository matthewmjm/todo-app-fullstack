import React from 'react';
import TodoContainer from './components/TodoContainer';
import './App.css';
const baseURL = `http://localhost:4000/todos/`

class App extends React.Component {
  state = {
    todos: []
  }

  componentDidMount() {
    fetch(baseURL)
      .then(response => response.json())
      .then(results => this.setState({todos:results}))
  }

  render() {
    return (
      <div className="App">
        <h1>Todo App</h1>
        <TodoContainer />
      </div>
    );
  }
}

export default App;