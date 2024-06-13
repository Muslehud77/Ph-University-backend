export type TLoginUser = {
  accessToken: string;
  refreshToken: string;
  isPasswordNeedsChange : boolean;
};

export type TLoginData = {
  id: string;
  password: string;
};

export type TChangePassword = {
  // id: string,
  oldPassword:string,
  newPassword:string
}
