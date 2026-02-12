import { useEffect, useState } from "react";
import Login from "./Pages/Login";
import Board from "./Pages/Board";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("auth_user");
    if (saved) setLoggedInUser(saved);
  }, []);

  const handleLoginSuccess = (username) => {
    localStorage.setItem("auth_user", username);
    setLoggedInUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_user");
    setLoggedInUser(null);
  };

  return (
    <div className="min-h-screen">
      {loggedInUser ? (
        <Board user={loggedInUser} onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
