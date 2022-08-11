import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import MainPage from './pages/mainPage';
import MenuAppBar from './components/navbar';
import Login from './components/login'

function App() {
  return (
    <div className="App">
      <Router>
      <MenuAppBar />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
