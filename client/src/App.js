import React from 'react'
import MenuBar from './components/MenuBar'
import Movie from './components/Movie'
import SideFilter from './components/SideFilter'
import './App.scss'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Movie />
      </header>
    </div>
  )
}

export default App
