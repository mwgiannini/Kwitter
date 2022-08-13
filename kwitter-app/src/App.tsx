import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import MenuAppBar from './components/navbar/navbar';
import { getStorage } from './helper';
import MainPage from './pages/mainPage';
import UserProfile from './pages/userProfile';
import SignIn from './components/signIn';
import SignUp from './components/signUp';


function App() {
  const ProtectedRoute = (props: any) => {
    if (JSON.parse(getStorage('loggedIn')!) !== true) {
      return <Navigate to="/signIn" replace />;
    }
    return <Outlet />;
  };

  return (
    <div className="App">
      <Router>
        <MenuAppBar />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/userprofile" element={<UserProfile />} />
          </Route>
          <Route path='/signIn' element={<SignIn />} />
          <Route path='/signUp' element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
