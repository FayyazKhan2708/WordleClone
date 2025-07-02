import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Stats.css";

const Stats = () => {
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch stats
        const statsRes = await axios.get("/wordle/stats");
        setStats(statsRes.data);

        // Fetch history
        const historyRes = await axios.get("/wordle/history");
        setHistory(historyRes.data);
      } catch (err) {
        setError(err.response?.data?.msg || "Failed to fetch stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!stats) {
    return (
      <div className="no-stats-message">
        No stats available yet. Play some games first!
      </div>
    );
  }

  // Calculate win percentage
  const winPercentage =
    stats.gamesPlayed > 0
      ? Math.round((stats.wins / stats.gamesPlayed) * 100)
      : 0;

  // Get max value in guess distribution for scaling
  const maxDistributionValue = Math.max(
    ...Object.values(stats.guessDistribution),
    1
  );

  return (
    <div className="stats-container">
      <h1 className="stats-title">Your Statistics</h1>

      <div className="stats-grid">
        <div className="stats-card">
          <div className="stats-card-value">{stats.gamesPlayed}</div>
          <div className="stats-card-label">Played</div>
        </div>

        <div className="stats-card">
          <div className="stats-card-value">{winPercentage}%</div>
          <div className="stats-card-label">Win %</div>
        </div>

        <div className="stats-card">
          <div className="stats-card-value">{stats.currentStreak}</div>
          <div className="stats-card-label">Current Streak</div>
        </div>

        <div className="stats-card">
          <div className="stats-card-value">{stats.maxStreak}</div>
          <div className="stats-card-label">Max Streak</div>
        </div>
      </div>

      <h2 className="stats-subtitle">Guess Distribution</h2>

      <div className="guess-distribution">
        {[1, 2, 3, 4, 5, 6, "fail"].map((guessCount) => {
          const count = stats.guessDistribution[guessCount] || 0;
          const percentage =
            maxDistributionValue > 0 ? (count / maxDistributionValue) * 100 : 0;

          return (
            <div key={guessCount} className="guess-row">
              <div className="guess-label">{guessCount}</div>
              <div className="guess-bar-container">
                <div
                  className={`guess-bar ${
                    guessCount === "fail"
                      ? "guess-bar-fail"
                      : "guess-bar-success"
                  }`}
                  style={{ width: `${Math.max(percentage, 5)}%` }}
                >
                  {count > 0 && count}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="stats-subtitle">Recent Games</h2>

      {history.length === 0 ? (
        <div className="no-games-message">No games played yet.</div>
      ) : (
        <div className="history-table-container">
          <table className="history-table">
            <thead>
              <tr className="history-table-header">
                <th className="history-table-cell">Word</th>
                <th className="history-table-cell">Guesses</th>
                <th className="history-table-cell">Date</th>
                <th className="history-table-cell">Result</th>
              </tr>
            </thead>
            <tbody>
              {history.slice(0, 10).map((game, index) => (
                <tr key={index} className="history-table-row">
                  <td className="history-table-cell history-word">
                    {game.word}
                  </td>
                  <td className="history-table-cell">{game.guesses.length}</td>
                  <td className="history-table-cell">
                    {new Date(game.date).toLocaleDateString()}
                  </td>
                  <td className="history-table-cell">
                    <span
                      className={`result-badge ${
                        game.won ? "result-badge-success" : "result-badge-fail"
                      }`}
                    >
                      {game.won ? "Won" : "Lost"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Stats;
