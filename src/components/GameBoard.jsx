"use client"

import { useState } from "react"
import "./GameBoard.css"

export default function GameBoard({ onGuess, gameWon, feedback }) {
  const [currentGuess, setCurrentGuess] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    const guess = Number.parseInt(currentGuess)

    // Validation
    if (isNaN(guess)) {
      setError("Please enter a valid number!")
      return
    }

    if (guess < 0 || guess > 100) {
      setError("Number must be between 0 and 100!")
      return
    }

    setError("")
    onGuess(guess)
    setCurrentGuess("")
  }

  return (
    <div className="game-board">
      <div className="card">
        <h2>Make Your Guess</h2>

        <form onSubmit={handleSubmit} className="guess-form">
          <div className="input-group">
            <input
              type="number"
              min="0"
              max="100"
              value={currentGuess}
              onChange={(e) => setCurrentGuess(e.target.value)}
              placeholder="Enter a number (0-100)"
              disabled={gameWon}
              className="guess-input"
            />
            {error && <p className="error-message">{error}</p>}
          </div>

          <button type="submit" disabled={gameWon || !currentGuess} className="submit-btn">
            {gameWon ? "Game Complete!" : "Submit Guess"}
          </button>
        </form>

        {feedback && (
          <div className={`feedback ${feedback.includes("Congratulations") ? "success" : "info"}`}>{feedback}</div>
        )}
      </div>
    </div>
  )
}
