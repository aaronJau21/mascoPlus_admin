export interface ILoginResponse {
  token: string;
  user: IUser;
}

export interface IUser {
  name: string;
  role: string;
}
