import React, { useState, useEffect } from 'react';
import Login from './Login';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      // Static Web Apps authentication check
      const response = await fetch('/.auth/me');
      const authResult = await response.json();
      
      if (authResult.clientPrincipal) {
        setUser(authResult.clientPrincipal);
      }
    };

    checkAuthStatus();
  }, []);

  // If no user, show login screen
  if (!user) {
    return <Login />;
  }

  // If user is logged in, show main app content
  return (
    <div>
      <h1>Welcome, {user.userDetails}</h1>
      <a href="/.auth/logout">Logout</a>
      {/* Rest of your app content */}
    </div>
  );
}

export default App;