import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainPage from './pages/mainPage';
import MenuAppBar from './components/navbar';
import Login from './components/login';
import { getStorage } from './helper';

function App() {
  const ProtectedRoute = (props:any) => {
    if (JSON.parse(getStorage('loggedIn')!) !== true) {
      console.log(JSON.parse(getStorage('loggedIn')!))
      return <Navigate to="/login" replace />;
    }
    return props.children;
  };

  return (
    <div className="App">
        <Router>
          <MenuAppBar />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainPage />
                </ProtectedRoute>
              }
            />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
