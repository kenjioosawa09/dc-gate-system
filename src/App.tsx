import {useState } from 'react';
import{BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import{LoginForm} from './types';
import {LoginPage} from './LoginPage';
import {DashboardPage} from './DashboardPage';

export default function App(){
    const[loggedInUser, setLoggedInUser] = useState<LoginForm | null>(()=>{
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    });

    const handleLogin =(user: LoginForm) => {
      setLoggedInUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    }

    const handleLogout = () =>{
      setLoggedInUser(null);
      localStorage.removeItem("user");
    };

    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace/>}/> 
          <Route path="/login" element=
          {<LoginPage onLoginSuccess={handleLogin}/>} />

          {/*ダッシュボードのURL*/}
          <Route path="/dashboard" element={loggedInUser ? (<DashboardPage user={loggedInUser} onLogout={handleLogout}/>) : (<Navigate to="/login" replace/>)
          }
        />
        </Routes>
      </BrowserRouter>
    );
}

