import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  // Function to handle login and set JWT token as cookie
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        credentials: 'include', // Important to send cookies with the request
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('An error occurred during login.');
    }
  };

  // Function to check the protected route
  const checkProtectedRoute = async () => {
    try {
      const response = await fetch('http://localhost:3000/protected', {
        method: 'GET',
        credentials: 'include', // Important to include cookies in the request
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message);
      }
    } catch (error) {
      setMessage('An error occurred while accessing the protected route.');
    }
  };

  return (
    <div className="App">
      <h1>JWT Cookie Test</h1>
      <button onClick={handleLogin}>Login</button>
      <button onClick={checkProtectedRoute}>Check Protected Route</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
