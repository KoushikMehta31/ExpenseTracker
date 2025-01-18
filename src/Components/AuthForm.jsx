
import React, { useState } from "react";
import "./AuthForm.css"; 

const AuthForm = ({ onAuth, isSignUp, setIsSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); 
  const [salary, setSalary] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp && (isNaN(salary) || salary <= 0)) {
      setError("Please enter a valid salary.");
      return;
    }

    if (isSignUp) {
      
      const newUser = { email, password, name, salary: parseFloat(salary) };
      localStorage.setItem("user", JSON.stringify(newUser)); 
      onAuth(newUser); 
    } else {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.email === email && storedUser.password === password) {
        onAuth(storedUser); 
      } else {
        setError("Invalid email or password.");
      }
    }
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Welcome to Your Expense Tracker</h2>
        {isSignUp && (
          <>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        {error && <div className="error-message">{error}</div>}

        <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
        
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="toggle-btn"
        >
          {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
