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

      {user?.role === 'admin' &&(
        <div style={{marginTop: "20px",padding: "15px", border: "2px solid #ff4444", borderRadius:"8px", backgroundColor:"fff5f5"}}>
          <h3 style={{color:"ff4444", marginTop: "0"}}>【管理者専用メニュー】</h3>
          <p>全ユーザーの入館履歴を閲覧できます。</p>
          <button style={{backgroundColor:"#ff4444", color:"white", border:"none", padding:"8px 16px", borderRadius:"4px",cursor:"pointer"}}>入館ログを確認する</button>
        </div>
      )}

      <hr style={{margin:"20px 0"}}/>
      <button onClick={handleLogoutClick}>ログアウト</button>
    </div>
  );
}