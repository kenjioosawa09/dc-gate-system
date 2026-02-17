import {useState } from 'react';
import{HashRouter, Routes, Route, Navigate} from 'react-router-dom'; 
//HashRouterは練習用なので、本番環境にした場合はBrowserRouterに変更する必要あり
import{LoginForm} from './types';
import {LoginPage} from './LoginPage';
import {DashboardPage} from './DashboardPage';
import {EntryLog} from './types';

export default function App(){

  //ユーザーデータをローカルストレージから読み込む。初回はnullになる
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

