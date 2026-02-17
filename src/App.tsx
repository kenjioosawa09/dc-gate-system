import {useState } from 'react';
import{HashRouter, Routes, Route, Navigate} from 'react-router-dom'; 
//HashRouterは練習用なので、本番環境にした場合はBrowserRouterに変更する必要あり
import{LoginForm} from './types';
import {LoginPage} from './LoginPage';
import {DashboardPage} from './DashboardPage';

export default function App(){
    const[loggedInUser, setLoggedInUser] = useState<LoginForm | null>(()=>{
     try{
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    }
    //データの読み込みに失敗した場合のエラーハンドリング
    catch(e){
      console.error("データの読み込みに失敗しました");
      return null;
    }
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
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace/>}/> 
          <Route path="/login" element=
          {<LoginPage onLoginSuccess={handleLogin}/>} />

          {/*ダッシュボードのURL*/}
          <Route path="/dashboard" element={loggedInUser ? (<DashboardPage user={loggedInUser} onLogout={handleLogout}/>) : (<Navigate to="/login" replace/>)
          }
        />
        </Routes>
      </HashRouter>
    );
}

