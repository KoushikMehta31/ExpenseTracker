

import React, { useState, useEffect } from "react";
import AuthForm from "./Components/AuthForm";
import ExpenseForm from "./Components/ExpenseForm";
import Summary from "./Components/Summary";
import ExpenseLists from "./Components/ExpenseLists";
import "./App.css";

const App = () => {
 
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [isSignUp, setIsSignUp] = useState(true); 

  
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const savedExpenses = JSON.parse(localStorage.getItem("expenses"));
    
    if (savedUser) {
      setUser(savedUser);
    }

    if (savedExpenses) {
      setExpenses(savedExpenses); 
    }
  }, []);

  const handleAuth = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData))
  };

  const handleLogout = () => {
    setUser(null);
    setExpenses([]);
    localStorage.removeItem("user"); 
    localStorage.removeItem("expenses");
  };

  const handlePasswordReset = (email) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email === email) {
      alert("Password reset link has been sent to your email.");
    } else {
      alert("Email not found.");
    }
  };

  const addExpense = (expense) => {
    const updatedExpenses = [...expenses, expense];
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses)); 
  };

  return (
    <div className="container">
     
      {!user ? (
        <AuthForm
          onAuth={handleAuth} 
          isSignUp={isSignUp}
          setIsSignUp={setIsSignUp}
          handlePasswordReset={handlePasswordReset}
        />
      ) : (
        <>
         
          <header className="app-header">
            <h1>Welcome, {user.name}!</h1>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </header>
          <Summary expenses={expenses} salary={user.salary} onUpdateSalary={(newSalary) => {
            const updatedUser = { ...user, salary: newSalary };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser)); 
          }} />
          <ExpenseForm addExpense={addExpense} />
          <ExpenseLists expenses={expenses} deleteExpense={deleteExpense} />
        </>
      )}
    </div>
  );
};

export default App;
