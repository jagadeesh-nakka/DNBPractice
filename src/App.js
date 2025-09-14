// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import SkillForm from './components/SkillForm';
import AdminPanel from './components/AdminPanel';
import './App.css';

function App() {
  const [selectedSkills, setSelectedSkills] = useState([]); // ✅ start as empty array

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navigation selectedSkills={selectedSkills} />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home setSelectedSkills={setSelectedSkills} />} />
            <Route path="/skills" element={<SkillForm setSelectedSkills={setSelectedSkills} />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
