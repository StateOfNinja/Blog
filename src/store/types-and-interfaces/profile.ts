export interface IProfileData {
  username: string;
  email: string;
  password: string;
  image?: string;
}

export interface IProfileResponse {
  user: IProfileData;
}

export interface IUser {
  email: string;
  token: string;
  username: string;
}
