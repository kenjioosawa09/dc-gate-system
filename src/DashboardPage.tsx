import React from 'react';
import {useNavigate} from 'react-router-dom';
import {LoginForm} from './types';

export function DashboardPage({user, onLogout}:{user: LoginForm | null, onLogout: () => void}){
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate("/login");
  };

  return(
    <div style={{padding:"20px"}}>
      <h1>ダッシュボード</h1>
      <p>ようこそ。{user?.userID}さん</p>
      <p>DC:{user?.location}</p>
      <button onClick={handleLogoutClick}>ログアウト</button>
    </div>
  );
}