
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate
} from 'react-router-dom';

import AddExpense from './Pages/AddExpense';
import ViewExpense from './Pages/ViewExpense';
import UpdateExpense from './Pages/UpdateExpense';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import './Expense.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/view" className="brand">
        ExpenseTrack
      </Link>

      <div className="nav-links">
        <Link
          to="/add"
          className={`nav-link ${
            location.pathname === '/add' ? 'active' : ''
          }`}
        >
          + Add Expense
        </Link>

        <Link
          to="/view"
          className={`nav-link ${
            location.pathname === '/view' ||
            location.pathname.startsWith('/update/')
              ? 'active'
              : ''
          }`}
        >
          View Expenses
        </Link>

        <button
          type="button"
          className="nav-link logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

const ExpenseLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <footer className="page-footer">
      ExpenseTrack · Manage your money better
    </footer>
  </>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/add"
          element={
            <ExpenseLayout>
              <AddExpense />
            </ExpenseLayout>
          }
        />

        <Route
          path="/view"
          element={
            <ExpenseLayout>
              <ViewExpense />
            </ExpenseLayout>
          }
        />

        <Route
          path="/update/:id"
          element={
            <ExpenseLayout>
              <UpdateExpense />
            </ExpenseLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
