import React from 'react'
import logo from './logo.svg'
import MenuBar from './components/MenuBar'
import Movie from './components/Movie'
import SideFilter from './components/SideFilter'
import './App.scss'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Movie />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
