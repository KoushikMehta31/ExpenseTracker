
import React, { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = ({ addExpense }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || !amount || !category) {
      setError("Please fill in all fields.");
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    
    const newExpense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      category,
    };


    addExpense(newExpense);


    setDescription("");
    setAmount("");
    setCategory("");
    setError("");
  };

  return (
    <div className="expense-form">
      <h2>Add Expense</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter expense description"
          />
        </div>
        <div className="input-group">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="0.01"
            step="0.01"
          />
        </div>
        <div className="input-group">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Utilities">Utilities</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <button type="submit" className="add-expense-button">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
