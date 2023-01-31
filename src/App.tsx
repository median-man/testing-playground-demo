import React, { useState } from "react";
import styled from "styled-components";
import { postLogin, User } from "./api";

const Form = styled.form`
  max-width: 20em;
  display: grid;
  grid-template-columns: 5em 1fr;
  row-gap: 1.125em;

  & button {
    grid-column: 2;
  }
`;

const Button = styled.button`
  display: block;
`;

export default function App() {
  const [pending, setPending] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const disableForm = !email || !password;

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (disableForm) {
      return;
    }

    setPending(true);

    // no errors because its a demo 😁
    const userData = await postLogin({ email, password });
    setPending(false);
    setUser(userData);
  };

  return (
    <div>
      <h1>Testing Playground Demo</h1>
      {user ? (
        <p>
          Hello, {user.first} {user.last}!
        </p>
      ) : (
        <Form onSubmit={handleLogin}>
          <label htmlFor="email">email:</label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={pending}
          />
          <label htmlFor="password">password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={pending}
          />
          <Button type="submit" disabled={disableForm || pending}>
            {pending ? "Loging in..." : "Login"}
          </Button>
        </Form>
      )}
    </div>
  );
}
