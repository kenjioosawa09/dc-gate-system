import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {LoginForm,EntryLog} from './types';
import {db} from './firebase';
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export function DashboardPage({user, onLogout} : {user: LoginForm | null, onLogout: () => void}) {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<EntryLog[]>([]);
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
        
        <div style={{
          marginTop: "20px",
          padding: "15px",
          border: "2px solid #ff4444",
          borderRadius:"8px",
          backgroundColor:"fff5f5"
          }}>
          <h3 style={{ color:"ff4444",marginTop: "0" }}>【管理者専用メニュー】</h3>
          <button onClick={() => navigate("/history")} 
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding:"10px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
               }}>
              ログイン履歴閲覧
          </button>
        </div>
      )}

      <hr style={{margin:"20px 0"}}/>
      <button onClick={handleLogoutClick}>ログアウト</button>
    </div>
  );
}