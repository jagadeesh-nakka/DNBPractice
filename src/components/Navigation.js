// // src/components/Navigation.js
// import React, { useState, useRef, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import '../styles/Navigation.css';
// import { FaUserCircle } from 'react-icons/fa';

// const Navigation = () => {
//   const { user, logout } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const profileRef = useRef();

//   // Close profile dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setIsProfileOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
//   const closeMenu = () => setIsMenuOpen(false);

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//     setIsProfileOpen(false);
//   };

//   // Hide all nav buttons on login or register page
//   const hideNav = ['/login', '/register'].includes(location.pathname);

//   return (
//     <nav className="navbar">
//       <div className="nav-container">
//         <Link to="/" className="nav-logo" onClick={closeMenu}>
//           SkillAssess
//         </Link>

//         {!hideNav && (
//           <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
//             <Link 
//               to="/home" 
//               className={`nav-item ${location.pathname === '/home' ? 'active' : ''}`}
//               onClick={closeMenu}
//             >
//               Home
//             </Link>

//             <Link 
//               to="/skills" 
//               className={`nav-item ${location.pathname === '/skills' ? 'active' : ''}`}
//               onClick={closeMenu}
//             >
//               My Skills
//             </Link>

//             {user && user.role === 'ADMIN' && (
//               <Link 
//                 to="/admin" 
//                 className={`nav-item ${location.pathname === '/admin' ? 'active' : ''}`}
//                 onClick={closeMenu}
//               >
//                 Admin Panel
//               </Link>
//             )}

//             {/* Profile dropdown */}
//             {user && (
//               <div className="nav-user" ref={profileRef}>
//                 <div className="profile-icon" onClick={() => setIsProfileOpen(!isProfileOpen)}>
//                   <FaUserCircle size={28} />
//                 </div>

//                 {isProfileOpen && (
//                   <div className="profile-dropdown">
//                     <div className="dropdown-item">Edit Profile</div>
//                     <div className="dropdown-item">Settings</div>
//                     <div className="dropdown-item" onClick={handleLogout}>
//                       Logout
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         )}

//         {!hideNav && (
//           <div className="nav-toggle" onClick={toggleMenu}>
//             <span className="bar"></span>
//             <span className="bar"></span>
//             <span className="bar"></span>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navigation;
// src/components/Navigation.js
// src/components/Navigation.js
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navigation.css';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';

const Navigation = ({ selectedSkills }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const profileRef = useRef();

  useEffect(() => {

  
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsProfileOpen(false);
  };

  const hideNav = ['/login', '/register'].includes(location.pathname);

  const handleSubmitSkills = async () => {
    if (!selectedSkills || !selectedSkills.length) {
      alert('Please select at least one skill before submitting.');
      return;
    }

    try {
      setLoading(true);
  


      // Submit all selected skills
      await Promise.all(
        selectedSkills.map((item) => {
          const skillsArray = item.skills.length ? item.skills : [{ secondarySkillId: 0 }];
          return Promise.all(
            skillsArray.map((s) => {
              const payload = {
                primarySkillId: item.primarySkillId,
                secondarySkillId: s.secondarySkillId ?? null,
                expertiseLevel: (s.expertiseLevel || 'BEGINNER').toUpperCase(),
                yearsOfExperience: s.yearsOfExperience ?? 0,
              };
              console.log('Submitting skill:', payload);
              console.log('User ID:', user.id);
              return axios.post(`/api/user-skills/${user.id}`, payload);
            })
          );
        })
      );

      alert('✅ Skills submitted successfully!');
    } catch (error) {
      console.error('Error submitting skills:', error);
      alert(
        error.response?.data?.message ||
        error.message ||
        'Failed to submit skills. Please check your input.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>SkillAssess</Link>

        {!hideNav && (
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/home" className={`nav-item ${location.pathname === '/home' ? 'active' : ''}`} onClick={closeMenu}>Home</Link>
            <Link to="/skills" className={`nav-item ${location.pathname === '/skills' ? 'active' : ''}`} onClick={closeMenu}>My Skills</Link>
            {user && user.role === 'ADMIN' && (
              <Link to="/admin" className={`nav-item ${location.pathname === '/admin' ? 'active' : ''}`} onClick={closeMenu}>Admin Panel</Link>
            )}

            {user && (
              <div className="nav-user" ref={profileRef} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button className="submit-skills-btn" onClick={handleSubmitSkills} disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit'}
                </button>

                <div className="profile-icon" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                  <FaUserCircle size={28} />
                </div>

                {isProfileOpen && (
                  <div className="profile-dropdown">
                    <div className="dropdown-item">Edit Profile</div>
                    <div className="dropdown-item">Settings</div>
                    <div className="dropdown-item" onClick={handleLogout}>Logout</div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {!hideNav && (
          <div className="nav-toggle" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
