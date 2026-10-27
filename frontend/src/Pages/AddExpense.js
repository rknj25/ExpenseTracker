
import React, { useState } from 'react';
import axios from 'axios';

const AddExpense = () => {
  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:9999/api/expense/add',
        form
      );

      alert(response.data.message);

      if (response.data.message === 'Expense Added..') {
        setForm({
          title: '',
          amount: '',
          category: ''
        });
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Unable to add expense');
    }
  };

  return (
    <main className="page-container">
      <header className="page-header">
        <h1 className="page-title">Add New Expense</h1>
        <p className="page-description">
          Record your spending to keep your finances organized.
        </p>
      </header>

      <section className="card form-card">
        <h2 className="form-title">Expense Details</h2>

        <form className="expense-form" onSubmit={handleSubmit}>
          <label htmlFor="title">Expense Title</label>
          <input
            className="form-control"
            id="title"
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Grocery shopping"
            required
          />

          <label htmlFor="amount">Amount (₹)</label>
          <input
            className="form-control"
            id="amount"
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            min="0.01"
            step="0.01"
            required
          />

          <label htmlFor="category">Category</label>
          <select
            className="form-control"
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="houserent">House Rent</option>
          </select>

          <button type="submit" className="btn btn-primary btn-full">
            + Add Expense
          </button>
        </form>
      </section>
    </main>
  );
};

export default AddExpense;
