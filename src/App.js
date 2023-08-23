import "./App.css";
import React, { useState } from 'react';
import Router from "./components/Router";
import Login from "./pages/login/Login";

function App() {
  const [token, setToken] = useState();
  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
    <>
      <Router />
    </>
  );
}

export default App;
