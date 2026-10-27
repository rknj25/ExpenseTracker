
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewExpense = () => {
  const [expdata, setExpdata] = useState([]);
  const [category, setCategory] = useState('All');

  const getData = async () => {
    try {
      const response = await axios.get(
        'https://expensetracker-ag3y.onrender.com/api/expense/view'
      );

      setExpdata(response.data.data || []);
    } catch (error) {
      alert(error.response?.data?.message || 'Unable to fetch expenses');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const filterData =
    category === 'All'
      ? expdata
      : expdata.filter(
          (item) =>
            item.category?.trim().toLowerCase() ===
            category.trim().toLowerCase()
        );

  const totalAmount = expdata.reduce(
    (total, item) => total + (Number(item.amount) || 0),
    0
  );

  const dltData = async (id) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) {
      return;
    }

    try {
      const response = await axios.delete(
        `https://expensetracker-ag3y.onrender.com/api/expense/delete/${id}`
      );

      alert(response.data.message);
      await getData();
    } catch (error) {
      alert(error.response?.data?.message || 'Unable to delete expense');
    }
  };

  return (
    <main className="page-container">
      <header className="page-header">
        <h1 className="page-title">Expense Dashboard</h1>
        <p className="page-description">
          Track your spending and manage your daily expenses.
        </p>
      </header>

      <section className="summary-grid">
        <div className="summary-card summary-purple">
          <p className="summary-label">Total Expenses</p>
          <h2 className="summary-value">{expdata.length}</h2>
        </div>

        <div className="summary-card summary-green">
          <p className="summary-label">Total Spending</p>
          <h2 className="summary-value">
            ₹{totalAmount.toLocaleString('en-IN', {
              maximumFractionDigits: 2
            })}
          </h2>
        </div>

        <div className="summary-card summary-orange">
          <p className="summary-label">Filtered Results</p>
          <h2 className="summary-value">{filterData.length}</h2>
        </div>
      </section>

      <section className="card">
        <div className="toolbar">
          <div>
            <h2 className="form-title">All Expenses</h2>
            <p className="page-description">
              Review and manage your recorded expenses.
            </p>
          </div>

          <Link to="/add" className="btn btn-primary">
            + Add Expense
          </Link>
        </div>

        <div className="filter-group" style={{ marginBottom: '22px' }}>
          <label htmlFor="filter-category">Filter by Category</label>

          <select
            id="filter-category"
            className="form-control filter-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="travel">Travel</option>
            <option value="food">Food</option>
            <option value="houserent">House Rent</option>
          </select>
        </div>

        <div className="table-wrapper">
          <table className="expense-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filterData.length === 0 ? (
                <tr>
                  <td colSpan="4" className="empty-message">
                    No expenses found. Add an expense to get started.
                  </td>
                </tr>
              ) : (
                filterData.map((item) => (
                  <tr key={item._id}>
                    <td>{item.title}</td>

                    <td className="amount-text">
                      ₹{Number(item.amount).toLocaleString('en-IN')}
                    </td>

                    <td>
                      <span className="category-badge">
                        {item.category}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/update/${item._id}`}
                          className="btn btn-warning"
                        >
                          Edit
                        </Link>

                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => dltData(item._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default ViewExpense;
