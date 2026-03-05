import { Navigate } from "react-router-dom";
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {collection, getDocs, query, orderBy } from "firebase/firestore";
import { db} from './firebase';
import {EntryLog} from "./types";

export function LoginHistoryPage(){
  const navigate = useNavigate();
    const [logs, setLogs] = useState<EntryLog[]>([]);

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
    <button onClick={() => navigate(-1)}>戻る</button>
    <h1>ログイン履歴閲覧</h1>

     <ul style={{listStyle: "none", padding:0, maxHeight:"200px", overflowY: "auto"}}>
            {logs.length === 0 ? (<li>ログがありません</li>) : logs.map(log => <li key={log.id}>{log.timestamp} - {log.userID} が {log.location} に入館しました</li>)}
          </ul>
          <button onClick={fetchLogs}
          style={{backgroundColor:"#ff4444", color:"white", border:"none", padding:"8px 16px", borderRadius:"4px",cursor:"pointer"}}>入館ログを確認する</button>

    </div>
  );
}