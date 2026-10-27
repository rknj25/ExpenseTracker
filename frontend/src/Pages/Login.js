
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:9999/api/user/login',
        login
      );

      alert(response.data.message);

      if (response.data.message === 'Login Successfully') {
        setLogin({
          email: '',
          password: ''
        });

        navigate('/add');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <main className="page-container">
      <div className="card auth-card">
        <div className="auth-brand">ExpenseTrack</div>

        <p className="auth-intro">
          Welcome back! Sign in to manage your expenses.
        </p>

        <h2 className="form-title">Login to Your Account</h2>

        <form className="expense-form" onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email Address</label>
          <input
            className="form-control"
            id="login-email"
            type="email"
            name="email"
            value={login.email}
            onChange={handleChange}
            placeholder="Enter your email"
            autoComplete="email"
            required
          />

          <label htmlFor="login-password">Password</label>
          <input
            className="form-control"
            id="login-password"
            type="password"
            name="password"
            value={login.password}
            onChange={handleChange}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />

          <button type="submit" className="btn btn-primary btn-full">
            Login
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/">Create Account</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
