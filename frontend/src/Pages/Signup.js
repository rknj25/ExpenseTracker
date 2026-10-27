
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
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
        'https://expensetracker-ag3y.onrender.com/api/user/register',
        form
      );

      alert(response.data.message);

      if (response.data.message === 'User register Successfully..') {
        setForm({
          name: '',
          email: '',
          password: ''
        });

        navigate('/login');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <main className="page-container">
      <div className="card auth-card">
        <div className="auth-brand">ExpenseTrack</div>

        <p className="auth-intro">
          Create your account and start managing your expenses.
        </p>

        <h2 className="form-title">Create Account</h2>

        <form className="expense-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <input
            className="form-control"
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            autoComplete="name"
            required
          />

          <label htmlFor="signup-email">Email Address</label>
          <input
            className="form-control"
            id="signup-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />

          <label htmlFor="signup-password">Password</label>
          <input
            className="form-control"
            id="signup-password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create a password"
            autoComplete="new-password"
            required
          />

          <button type="submit" className="btn btn-primary btn-full">
            Create Account
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Signup;
