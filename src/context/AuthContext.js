// // src/context/AuthContext.js
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import * as authService from '../services/auth'; // import all as named

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         if (typeof authService.getCurrentUser === 'function') {
//           const currentUser = await authService.getCurrentUser();
//           if (currentUser && authService.isAuthenticated && authService.isAuthenticated()) {
//             setUser(currentUser);
//           }
//         }
//       } catch (err) {
//         console.error('Auth check failed:', err);
//         if (typeof authService.logout === 'function') {
//           authService.logout();
//         }
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   const login = async (username, password) => {
//     try {
//       setLoading(true);
//       setError('');
//       if (typeof authService.login === 'function') {
//         const result = await authService.login(username, password);
//         if (result.success) {
//           const currentUser = await authService.getCurrentUser();
//           setUser(currentUser);
//           return { success: true };
//         } else {
//           setError(result.error);
//           return { success: false, error: result.error };
//         }
//       } else {
//         throw new Error('authService.login is not defined');
//       }
//     } catch (err) {
//       const errorMsg = err.response?.data?.message || err.message || 'Login failed';
//       setError(errorMsg);
//       return { success: false, error: errorMsg };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const register = async (userData) => {
//     try {
//       setLoading(true);
//       setError('');
//       if (typeof authService.register === 'function') {
//         const result = await authService.register(userData);
//         if (result.success) {
//           return { success: true, message: result.message };
//         } else {
//           setError(result.error);
//           return { success: false, error: result.error };
//         }
//       } else {
//         throw new Error('authService.register is not defined');
//       }
//     } catch (err) {
//       const errorMsg = err.response?.data?.message || err.message || 'Registration failed';
//       setError(errorMsg);
//       return { success: false, error: errorMsg };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     if (typeof authService.logout === 'function') {
//       authService.logout();
//     }
//     setUser(null);
//     setError('');
//   };

//   const value = {
//     user,
//     loading,
//     error,
//     login,
//     register,
//     logout,
//     isAuthenticated: !!user,
//     isAdmin: user?.role === 'ADMIN',
//     clearError: () => setError(''),
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;


// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import * as authService from '../services/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      
      try {
        const currentUser = await authService.getCurrentUser();
        console.log('Current user:', currentUser);
        if (currentUser && authService.isAuthenticated()) {
          setUser(currentUser);
          console.log('User set:', currentUser);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        authService.logout();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      setLoading(true);
      setError('');
      const result = await authService.login(username, password);
      if (result.success) {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMsg = err.message || 'Login failed';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setError('');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        isAuthenticated: !!user,
        clearError: () => setError(''),
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
