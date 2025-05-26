"use client"

import { useState } from "react"
import GameHeader from "./components/GameHeader"
import GameBoard from "./components/GameBoard"
import GameStats from "./components/GameStats"
import "./App.css"

function App() {
  const [secretNumber] = useState(() => Math.floor(Math.random() * 101))
  const [guessCount, setGuessCount] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [guessHistory, setGuessHistory] = useState([])

  const handleGuess = (guess) => {
    const newGuessCount = guessCount + 1
    setGuessCount(newGuessCount)

    const newGuess = {
      number: guess,
      feedback: "",
      attempt: newGuessCount,
    }

    if (guess === secretNumber) {
      newGuess.feedback = "correct"
      setFeedback("🎉 Congratulations! You guessed it!")
      setGameWon(true)
    } else if (guess < secretNumber) {
      newGuess.feedback = "low"
      setFeedback("📈 Too low! Try a higher number.")
    } else {
      newGuess.feedback = "high"
      setFeedback("📉 Too high! Try a lower number.")
    }

    setGuessHistory((prev) => [...prev, newGuess])
  }

  const resetGame = () => {
    window.location.reload()
  }

  const score = gameWon ? 100 - guessCount : 0

  return (
    <div className="app">
      <div className="container">
        <GameHeader />

        <div className="game-layout">
          <div className="game-left">
            <GameBoard onGuess={handleGuess} gameWon={gameWon} feedback={feedback} />

            {gameWon && (
              <div className="victory-card">
                <h3>Game Complete! 🎊</h3>
                <p>
                  You found the number <span className="highlight">{secretNumber}</span> in {guessCount} tries!
                </p>
                <p className="score-text">Your Score: {score}/100</p>
                <button onClick={resetGame} className="play-again-btn">
                  Play Again
                </button>
              </div>
            )}
          </div>

          <GameStats guessCount={guessCount} score={score} guessHistory={guessHistory} gameWon={gameWon} />
        </div>
      </div>
    </div>
  )
}

export default App
