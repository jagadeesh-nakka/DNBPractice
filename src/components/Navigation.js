// src/components/Navigation.js
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navigation.css';

const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // ✅ Hide nav on login and register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          SkillAssess
        </Link>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Home
          </Link>

          {user && (
            <Link 
              to="/skills" 
              className={`nav-item ${location.pathname === '/skills' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              My Skills
            </Link>
          )}

          {user && user.role === 'ADMIN' && (
            <Link 
              to="/admin" 
              className={`nav-item ${location.pathname === '/admin' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Admin Panel
            </Link>
          )}

          {user ? (
            <div className="nav-user">
              <span className="nav-username">Hello, {user.username}</span>
              <button className="nav-logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="nav-auth">
              <Link 
                to="/login" 
                className={`nav-item ${location.pathname === '/login' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Logout
              </Link>
              <Link 
                to="/profile" 
                className={`nav-item ${location.pathname === '/register' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                profile
              </Link>
            </div>
          )}
        </div>

        <div className="nav-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
