"use client"

import { useState } from "react"
import GameBoard from "@/components/game-board"
import GameStats from "@/components/game-stats"
import GameHeader from "@/components/game-header"

export default function NumberGuessingGame() {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <GameHeader />

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="space-y-6">
            <GameBoard onGuess={handleGuess} gameWon={gameWon} feedback={feedback} />

            {gameWon && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <h3 className="text-2xl font-bold text-green-800 mb-2">Game Complete! 🎊</h3>
                <p className="text-green-700 mb-4">
                  You found the number <span className="font-bold">{secretNumber}</span> in {guessCount} tries!
                </p>
                <p className="text-xl font-semibold text-green-800 mb-4">Your Score: {score}/100</p>
                <button
                  onClick={resetGame}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
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
