import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {LoginForm} from'./types';
import{db} from './firebase';
import{ collection, addDoc, serverTimestamp}  from 'firebase/firestore';

export function LoginPage({onLoginSuccess}:{onLoginSuccess:(data:LoginForm)=> void}){
  const[form, setForm] = useState<LoginForm>({userID:"",password:"", location:"第1DC", role:"user"});
  const[error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const{name,value} = e.target;
      setForm({...form,[name]: value});
    };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userRole: 'admin' | 'user' = form.userID === 'admin' ? 'admin' : 'user';

    if(form.userID ==="" || form.password ===""){
      setError("ユーザーIDとパスワードを入力してください");
      return;
    }

    try{
      await addDoc(collection(db, "Login_logs"),{
        userID: form.userID,
        location: form.location,
        role: userRole,
        timestamp: serverTimestamp(),
      });
      console.log("ログイン履歴をFirebaseに保存しました");

      const loginData: LoginForm = {
        ...form,
        role: userRole,
      };

    setError("");
    onLoginSuccess(loginData); //APPコンポーネントにログイン成功を通知
    navigate("/dashboard"); //URLを切り替え
  } catch(err){
    console.error("Firebaseへの保存に失敗しました");
  }
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