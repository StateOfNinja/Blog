export interface ISignUpData {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  agreement: boolean;
}

export type TSignError = {
  data: {
    errors: { [key: string]: string };
  };
  status: number;
};

export interface ISignInData {
  email: string;
  password: string;
}
