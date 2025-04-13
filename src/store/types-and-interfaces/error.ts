export type TError = {
  data: {
    errors: { [key: string]: string };
  };
  status: number;
};
