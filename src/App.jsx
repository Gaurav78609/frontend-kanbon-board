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
    setLoggedInUser(username);
    localStorage.setItem("auth_user", username);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-7xl p-6">
        {loggedInUser ? (
          <Board user={loggedInUser} />
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
    </div>
  );
}

export default App;



