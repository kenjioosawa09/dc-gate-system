import React, {useState } from 'react';
import{BrowserRouter, Routes, Route, useNavigate, Navigate} from 'react-router-dom';

interface LoginForm{
  userID: string;
  password: string;
  location:"第1DC" | "第2DC" | "第3DC";
}

//ログイン用コンポーネント
function LoginPage({onLoginSuccess}:{onLoginSuccess:(data:LoginForm)=>void}){
  const[form, setForm] = useState<LoginForm>({ userID:"", password:"", location:"第1DC"});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const{name,value} = e.target;
    setForm({...form,[name]: value});
  };

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if(form.userID ==="" || form.password ===""){
    setError("ユーザーIDとパスワードを入力してください");
    return;
  }
  setError("");
  onLoginSuccess(form); //APPコンポーネントにログイン成功を通知
  navigate("/dashboard"); //URLを切り替え
};

//ログインしていない場合の表示
return(
  <div style={{padding:"20px"}}>
    <h1>入館管理システム</h1>
    <form onSubmit={handleSubmit}>
      <div>
          <label>ユーザーID:</label>
          <input name="userID" value={form.userID} onChange={handleChange}/>
        </div>
        <div>
          <label>パスワード:</label>
          <input type="password" name="password" value={form.password} onChange={handleChange}/>
        </div>
        <div>
          <label>入館場所:</label>
          <select name="location" value={form.location} onChange={handleChange}>
            <option value="第1DC">第1DC</option>
            <option value="第2DC">第2DC</option>
            <option value="第3DC">第3DC</option>
          </select>
        </div>
        {error && <p style ={{color: "red", fontSize:"14px"}}>{error}</p>}

        <button type="submit" style={{marginTop:"10px"}}>ログイン</button>
    </form>
    <hr/>
    <h3>入力確認(stateの状態)</h3>
    <pre>{JSON.stringify(form,null,2)}</pre>
  </div>
 );
}

function DashboardPage({user}:{user: LoginForm | null}){
  const navigate = useNavigate();

  return(
    <div style={{padding:"20px"}}>
      <h1>ダッシュボード</h1>
      <p>ようこそ。{user?.userID}さん</p>
      <p>DC:{user?.location}</p>
      <button onClick={() => navigate("/login")}>ログアウト</button>
    </div>
  );
}

export default function App(){
    const[loggedInUser, setLoggedInUser] = useState<LoginForm | null>(null);

    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace/>}/> 
          <Route path="/login" element={<LoginPage onLoginSuccess={setLoggedInUser}/>} />
          <Route path="/dashboard" element={<DashboardPage user={loggedInUser}/>}/>
        </Routes>
      </BrowserRouter>
    );
}

