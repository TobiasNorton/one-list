import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [],
      newItemText: ''
    }
  }

  loadAllTodos = () => {
    axios
      .get('https://one-list-api.herokuapp.com/items?access_token=wagyu_wednesday')
      .then(response => {
        this.setState({
          todos: response.data
        })
      })
  }

  componentDidMount = () => {
    this.loadAllTodos()
  }

  changeText = event => {
    this.setState(
      {
        newItemText: event.target.value
      },
      () => console.log(this.state.newItemText)
    )
  }

  newItem = event => {
    event.preventDefault()
    axios
      .post('https://one-list-api.herokuapp.com/items?access_token=wagyu_wednesday', {
        item: {
          text: this.state.newItemText,
          complete: false
        }
      })
      .then(response => {
        this.loadAllTodos()
      })
    console.log(this.state.newItemText)
  }

  completeTodo = event => {
    axios
      .put(
        `https://one-list-api.herokuapp.com/items/${
          event.target.dataset.idfromapi
        }?access_token=wagyu_wednesday`,
        {
          item: {
            complete: true
          }
        }
      )
      .then(response => {
        this.loadAllTodos()
      })
  }

  deleteItem = event => {
    axios
      .delete(
        `https://one-list-api.herokuapp.com/items/${
          event.target.dataset.idfromapi
        }?access_token=wagyu_wednesday`
      )
      .then(response => {
        this.loadAllTodos()
      })
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>One List</h1>
        </header>
        <main>
          <form onSubmit={this.newItem}>
            <input
              value={this.state.newItemText}
              type="text"
              placeholder=" Whats up?"
              onChange={this.changeText}
            />
          </form>
          <ul className="one-list">
            {this.state.todos.map((todo, index) => {
              const todoClass = todo.complete ? 'completed' : ''
              return (
                <li
                  key={index}
                  data-idfromapi={todo.id} //this is the actual id key from the object
                  onClick={this.completeTodo}
                  onDoubleClick={this.deleteItem}
                  className={todoClass}
                >
                  {todo.text}
                </li>
              )
            })}
          </ul>
        </main>
        <footer>
          <p>
            <img src={logo} height="42" alt="logo" />
          </p>
          <p>&copy; Tobias Norton Productivity Advocates</p>
        </footer>
      </div>
    )
  }
}

export default App
