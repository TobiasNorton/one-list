import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1>One List</h1>
        </header>
        <main>
          <ul className="one-list">
            <li className="completed">Review at 2</li>
            <li>Watch Videos</li>
            <li>Eat Dinner</li>
            <li>Code</li>
            <li>Sleep</li>
          </ul>
          <input type="text" placeholder="Whats up?" />
        </main>
        <footer>
          <p>
            <img src={logo} height="42" alt="logo" />
          </p>
          <p>&copy; 2018 Tobias Norton Productivity Advocates</p>
        </footer>
      </div>
    )
  }
}

export default App
