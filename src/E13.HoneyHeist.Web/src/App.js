import React, { useState, useEffect } from 'react';
import Login from './Login';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('/.auth/me');
        const authResult = await response.json();
        
        if (authResult.clientPrincipal) {
          setUser(authResult.clientPrincipal);
        }
      } catch (error) {
        console.error('Authentication check failed', error);
      }
    };

    checkAuthStatus();
  }, []);

  // If no user, show login screen
  if (!user) {
    return <Login />;
  }

  // Original app content when user is logged in
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome, {user.userDetails}</p>
        <a
          href="/.auth/logout"
          className="App-link"
        >
          Logout
        </a>
      </header>
    </div>
  );
}

export default App;