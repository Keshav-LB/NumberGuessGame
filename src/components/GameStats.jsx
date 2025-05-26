import "./GameStats.css"

export default function GameStats({ guessCount, score, guessHistory, gameWon }) {
  return (
    <div className="game-stats">
      <div className="card">
        <h2>Game Statistics</h2>

        <div className="stats-grid">
          <div className="stat-item blue">
            <div className="stat-number">{guessCount}</div>
            <div className="stat-label">Guesses Made</div>
          </div>
          <div className="stat-item purple">
            <div className="stat-number">{score}</div>
            <div className="stat-label">Current Score</div>
          </div>
        </div>

        <div className="remaining-score">
          <div className="remaining-number">{100 - guessCount}</div>
          <div className="remaining-label">Remaining Score</div>
          <div className="remaining-sub">(if you guess correctly next)</div>
        </div>
      </div>

      {guessHistory.length > 0 && (
        <div className="card">
          <h2>Guess History</h2>
          <div className="history-list">
            {guessHistory.map((guess, index) => (
              <div key={index} className={`history-item ${guess.feedback}`}>
                <span className="guess-number">
                  #{guess.attempt}: {guess.number}
                </span>
                <span className="guess-result">
                  {guess.feedback === "correct"
                    ? "✅ Correct!"
                    : guess.feedback === "high"
                      ? "⬇️ Too High"
                      : "⬆️ Too Low"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
