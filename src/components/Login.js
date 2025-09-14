// // src/components/Login.js
// import React, { useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { Link, useNavigate } from 'react-router-dom';
// import '../styles/Login.css';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const { login, user, error } = useAuth();
//   const navigate = useNavigate(); // Add navigation

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const result = await login(username, password);
//     if (result.success) {
//       navigate('/home'); // Navigate to Home.js
//     } else {
//       alert(result.error); // show error
//     }
//   };

//   if (user) {
//     return (
//       <div className="login-container">
//         <h2>Welcome, {user.username} 🎉</h2>
//         <p>You are now logged in.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="login-page">
//       <div className="login-left">
//         <img 
//           src="https://i.ytimg.com/vi/TpnCCAuNSAQ/maxresdefault.jpg" 
//           alt="Login Illustration" 
//           className="login-image"
//         />
//       </div>

//       <div className="login-right">
//         <form onSubmit={handleSubmit} className="login-form">
//           <h2>Login</h2>
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">Login</button>
//         </form>

//         <div className="signup-link">
//           <p>
//             Don't have an account? <Link to="/register">Sign Up</Link>
//           </p>
//         </div>

//         {error && <p className="error-message">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default Login;


// src/components/Login.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

// Reusable Modal component
const Modal = ({ title, message, onOk }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{title}</h3>
        <p>{message}</p>
        <button onClick={onOk}>OK</button>
      </div>
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const { login, user, clearError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(username, password);

    if (result.success) {
      setModalMessage(`Welcome, ${username} 🎉 You are now logged in.`);
      setShowModal(true);
    } else {
      // Show error in modal instead of alert
      setModalMessage(result.error || 'Login failed');
      setShowModal(true);
    }
  };

  const handleModalOk = () => {
    setShowModal(false);
    if (user) {
      navigate('/home'); // Navigate on successful login
    } else {
      clearError(); // Clear error if it was shown
    }
  };

  if (user) {
    return (
      <div className="login-container">
        <h2>Welcome, {user.username} 🎉</h2>
        <p>You are now logged in.</p>
        <button onClick={handleModalOk}>OK</button>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-left">
        <img
          src="https://i.ytimg.com/vi/TpnCCAuNSAQ/maxresdefault.jpg"
          alt="Login Illustration"
          className="login-image"
        />
      </div>

      <div className="login-right">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <button type="submit">Login</button>
        </form>

        <div className="signup-link">
          <p>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>

        {/* Modal */}
        {showModal && (
          <Modal
            title={user ? 'Login Successful!' : 'Login Failed'}
            message={modalMessage}
            onOk={handleModalOk}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
