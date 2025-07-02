import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { GameProvider } from "./contexts/GameContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Stats from "./pages/Stats";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

function App() {
  useEffect(() => {
    document.title = "Wordle";
  }, []);

  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <GameProvider>
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 no-scrollbar">
              <Header />
              <main className="container mx-auto px-4 py-8 pt-24 flex flex-col items-center no-scrollbar">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/stats"
                    element={
                      <PrivateRoute>
                        <Stats />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/"
                    element={
                      <PrivateRoute>
                        <Home />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </main>
              <footer className="text-center py-4 text-gray-500 text-sm dark:text-gray-400">
                <p>© {new Date().getFullYear()} Wordle - A fun word game</p>
              </footer>
            </div>
          </GameProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
