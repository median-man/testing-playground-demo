export interface User {
  id: string;
  first: string;
  last: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const postLogin = ({ email, password }: LoginPayload): Promise<User> => {
  console.log("Fake login", email, password);

  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          id: "abc123",
          first: "Fitzwilliam",
          last: "Darcy"
        }),
      800
    )
  );
};
