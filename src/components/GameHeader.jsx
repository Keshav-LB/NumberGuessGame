import "./GameHeader.css"

export default function GameHeader() {
  return (
    <div className="game-header">
      <h1>🎯 Number Guessing Game</h1>
      <p>
        I'm thinking of a number between 0 and 100. Can you guess it? Your score will be{" "}
        <span className="formula">100 - (number of guesses)</span>.
      </p>
    </div>
  )
}
