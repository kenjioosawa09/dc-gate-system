import React, {useState } from 'react';

interface LoginForm{
  userID: string;
  password: string;
  location:"第1DC" | "第2DC" | "第3DC";
}

export default function App() {
  const [form, setForm] = useState<LoginForm>  ({
    userID:"",
    password:"",
    location:"第1DC"
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[error, setError] = useState("");

  //入力が変わったときに呼ぶ関数
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    {
      const{name,value} = e.target;

      //フォームのname項目だけ更新
      setForm({...form,[name]:value});
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=> {e.preventDefault();

//エラー処理
if(form.userID ==="" || form.password ===""){
  setError("ユーザーIDとパスワードを入力してください");
  return;
}
  setError("");
  console.log("送信内容:",form);
  alert(`${form.userID}さん、${form.location}にログインしました。`);
  setIsLoggedIn(true);
};

//ログイン済みの場合表示
  if(isLoggedIn){
    return(
      <div style={{padding:"20px"}}>
        <h1>ログイン中</h1>
        <p>ようこそ!{form.userID}さん！</p>
        <button onClick={()=> setIsLoggedIn(false)}>ログアウト</button>
        </div>
    );
  }

  return (
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
        <button type="submit" style={{marginTop:"10px"}}>ログイン</button>
        </form>

        {/*以下、動作確認用。リリース時は削除すること*/}
        <hr/>
        <h3>入力確認(stateの状態)</h3>
        <pre>{JSON.stringify(form,null,2)}</pre>
        {/*ここまで削除*/}
    </div>
  );
}//App