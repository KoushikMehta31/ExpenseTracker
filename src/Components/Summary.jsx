
import React, { useState } from "react";
import "./Summary.css";

const Summary = ({ expenses, salary, onUpdateSalary }) => {
  const formattedSalary = isNaN(salary) ? 0 : parseFloat(salary);


  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);


  const remainingBalance = formattedSalary - totalExpenses;


  const [isEditing, setIsEditing] = useState(false);
  const [newSalary, setNewSalary] = useState(formattedSalary);


  const handleSalaryChange = () => {
    const parsedSalary = parseFloat(newSalary);

 
    if (isNaN(parsedSalary) || parsedSalary <= 0) {
      alert("Please enter a valid salary.");
      return;
    }

  
    onUpdateSalary(parsedSalary);
    setIsEditing(false);
  };

 
  const isSaveDisabled = isNaN(newSalary) || newSalary <= 0 || newSalary === "";


  const handleSalaryInputChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = parseFloat(inputValue);

    
    if (!isNaN(numericValue) || inputValue === "") {
      setNewSalary(inputValue);
    }
  };

  return (
    <div className="summary">
      <h2>Summary</h2>
      <div className="summary-item">
        <span>Salary:</span>
        {isEditing ? (
          <div>
            <input
              type="number"
              value={newSalary}
              onChange={handleSalaryInputChange} 
              min="0"
              step="0.01"
              aria-label="Edit salary"
            />
            <button
              onClick={handleSalaryChange}
              disabled={isSaveDisabled} 
              aria-label="Save salary"
            >
              Save
            </button>
            <button onClick={() => setIsEditing(false)} aria-label="Cancel editing salary">
              Cancel
            </button>
          </div>
        ) : (
          <span>{formattedSalary.toFixed(2)}</span>
        )}
      </div>
      <div className="summary-item">
        <span>Total Expenses:</span>
        <span>{totalExpenses.toFixed(2)}</span>
      </div>
      <div className="summary-item">
        <span>Remaining Balance:</span>
        <span>{remainingBalance.toFixed(2)}</span>
      </div>
     
      {!isEditing && (
        <button onClick={() => setIsEditing(true)} aria-label="Edit salary">
          Edit Salary
        </button>
      )}
    </div>
  );
};

export default Summary;
