import React from 'react'
import './App.css'
import PuzzleGame from './components/PuzzleGame'

function App() {
  return (
    <div className="app">
      <header>
        <h1>Chess Puzzles</h1>
      </header>
      <main>
        <PuzzleGame />
      </main>
    </div>
  )
}

export default App
