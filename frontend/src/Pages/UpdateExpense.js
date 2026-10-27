
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const UpdateExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: ''
  });

  useEffect(() => {
    const getPar = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9999/api/expense/find/${id}`
        );

        const expense = response.data.particular;

        if (!expense) {
          alert('Expense not found');
          navigate('/view');
          return;
        }

        setForm({
          title: expense.title ?? '',
          amount: expense.amount ?? '',
          category: expense.category ?? ''
        });
      } catch (error) {
        alert(error.response?.data?.message || 'Unable to fetch expense');
      }
    };

    getPar();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const updExp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:9999/api/expense/update/${id}`,
        form
      );

      alert(response.data.message);

      if (response.data.message === 'Expense Updated..') {
        navigate('/view');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Unable to update expense');
    }
  };

  return (
    <main className="page-container">
      <header className="page-header">
        <h1 className="page-title">Update Expense</h1>
        <p className="page-description">
          Edit the expense details and save your changes.
        </p>
      </header>

      <section className="card form-card">
        <h2 className="form-title">Edit Expense Details</h2>

        <form className="expense-form" onSubmit={updExp}>
          <label htmlFor="title">Expense Title</label>
          <input
            className="form-control"
            id="title"
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
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

          <button type="submit" className="btn btn-success btn-full">
            Save Changes
          </button>

          <Link to="/view" className="btn btn-warning btn-full">
            Cancel
          </Link>
        </form>
      </section>
    </main>
  );
};

export default UpdateExpense;
