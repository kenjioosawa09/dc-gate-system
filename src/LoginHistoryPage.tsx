import { Navigate } from "react-router-dom";

export function LoginHistoryPage(){
  return(
    <div style={{padding:"20px"}}>
    <button onClick={() => Navigate(-1)}>戻る</button>
    <h1>ログイン履歴閲覧</h1>
    </div>
  );
}