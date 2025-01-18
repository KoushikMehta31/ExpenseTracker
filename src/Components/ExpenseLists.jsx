import React from "react";
import "./ExpenseList.css";

const ExpenseList = ({ expenses, deleteExpense }) => {
  return (
    <div className="expense-list">
      <h2>Expense List</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id} className="expense-item">
            <div className="expense-details">
              <p className="expense-description">{expense.description}</p>
              <p className="expense-amount">${expense.amount.toFixed(2)}</p>
              <p className="expense-category">{expense.category}</p>
            </div>
            <button
              className="delete-button"
              onClick={() => deleteExpense(expense.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;

