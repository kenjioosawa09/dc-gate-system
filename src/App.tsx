import {useEffect, useState } from 'react';
import{HashRouter, Routes, Route, Navigate} from 'react-router-dom'; 
//HashRouterは練習用なので、本番環境にした場合はBrowserRouterに変更する必要あり
import{LoginForm} from './types';
import {LoginPage} from './LoginPage';
import {DashboardPage} from './DashboardPage';
import {EntryLog} from './types';
import { db } from './firebase';
import {doc, getDoc, collection, addDoc, serverTimestamp} from "firebase/firestore"; 

export default function App(){

  //ユーザーデータをローカルストレージから読み込む。初回はnullになる
    const[loggedInUser, setLoggedInUser] = useState<LoginForm | null>(null);

    useEffect(()=>{
      const fetchUser = async () => {
        try{
          const docRef = doc(db, "users", "currentUser");
          const docSnap = await getDoc(docRef);

          if(docSnap.exists()){
            setLoggedInUser(docSnap.data() as LoginForm);
          }
        } catch (e){
          console.error("Firebaseからの読み込みに失敗しました", e);
        }
         };
         fetchUser();
    },[]); 
     

    //入館ログの管理
    const[logs, setLogs] = useState<EntryLog[]>([]);
    const addLog = (userID: string, location: string) =>{
    const newLog: EntryLog ={
        id: Date.now().toString(),
        userID: userID,
        location: location,
        timestamp: new Date().toLocaleString(),
      };
      setLogs([newLog,...logs]);
    }

   //ログイン成功時の処理
    const handleLogin =(loginData: LoginForm) => {
      setLoggedInUser(loginData);
      addLog(loginData.userID, loginData.location);
      localStorage.setItem("user", JSON.stringify(loginData));
    }

    //ログアウト処理
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
          <Route path="/dashboard" element={loggedInUser ? (<DashboardPage user={loggedInUser} onLogout={handleLogout} onEntry={addLog} logs={logs} />) : (<Navigate to="/login" replace/>)
          }
        />
        </Routes>
      </HashRouter>
    );
}

