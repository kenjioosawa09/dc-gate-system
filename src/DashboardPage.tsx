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

  const fetchLogs = async () => {
    try{
      const q = query(collection(db, "Login_logs"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);

      const fetchedLogs = querySnapshot.docs.map(doc => {
        const data = doc.data() as EntryLog;

        return{
          ...data,
          id: doc.id,
          timestamp: data.timestamp?.toDate().toLocaleString() || "日時不明",
        };
        });

      setLogs(fetchedLogs);
      console.log("ログを取得しました", fetchedLogs);
     } catch (e) {
      console.error("ログの取得に失敗しました", e);
      alert("履歴の読み込みに失敗しました。");
    }
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
          <button onClick={() => navigate("/admin/history")} style={{backgroundColor: "#007bff", color: "white", padding:"10px",
            border: "none", borderRadius: "4px", cursor: "pointer" }}>ログイン履歴閲覧</button>

          <ul style={{listStyle: "none", padding:0, maxHeight:"200px", overflowY: "auto"}}>
            {logs.length === 40 ? (<li>ログがありません</li>) : logs.map(log => <li key={log.id}>{log.timestamp} - {log.userID} が {log.location} に入館しました</li>)}
          </ul>
          <button onClick={fetchLogs}
          style={{backgroundColor:"#ff4444", color:"white", border:"none", padding:"8px 16px", borderRadius:"4px",cursor:"pointer"}}>入館ログを確認する</button>
        </div>
      )}

      <hr style={{margin:"20px 0"}}/>
      <button onClick={handleLogoutClick}>ログアウト</button>
    </div>
  );
}