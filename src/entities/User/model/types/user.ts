export interface User {
  id?: string;
  sessionId?: string;
  email?: string;
  username?: string;
  created_at?: number;
}

export interface UserSchema {
  userData?: User;
  token?: string;
  _inited: boolean;
}
