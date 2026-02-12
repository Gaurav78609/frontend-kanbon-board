import { useState } from "react";

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter email or username");
      return;
    }

    onLoginSuccess(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-lg">
        <h1 className="text-2xl font-semibold text-white text-center mb-2">
          Kanban Board
        </h1>

        <p className="text-center text-slate-400 text-sm mb-6">
          Sign in to continue
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email or Username"
            className="w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-white placeholder-slate-400 outline-none focus:border-indigo-500"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 transition py-2 rounded-md text-white font-medium"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          Mock authentication · No password required
        </p>
      </div>
    </div>
  );
}
