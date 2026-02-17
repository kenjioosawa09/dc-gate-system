export interface LoginForm {
  userID: string;
  password: string;
  location: "第1DC" |"第2DC"|"第3DC";
  role: 'admin' |'user';
}

export interface EntryLog{
  id: string;
  userID: string;
  location: string;
  timestamp: string;
}