import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import CreateAccount from './CreateAccount';
import Payments from './Payments';
import ManageData from './ManageData';
import SetOptions from './SetOptions';

function Home() {
  return (
    <div className="App">
      <h1>Diamante Network Operations</h1>
      <section>
        <Link to="/create-account">
          <button>Create Account</button>
        </Link>
        <Link to="/payments">
          <button>Payments</button>
        </Link>
        <Link to="/manage-data">
          <button>Manage Data</button>
        </Link>
        <Link to="/set-options">
          <button>Set Options</button>
        </Link>
      </section>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/manage-data" element={<ManageData />} />
        <Route path="/set-options" element={<SetOptions />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
