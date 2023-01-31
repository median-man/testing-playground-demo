import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("displays heading", () => {
  render(<App />);

  expect(
    screen.getByRole("heading", {
      name: /testing playground demo/i
    })
  ).toBeInTheDocument();
});

test("login flow", async () => {
  render(<App />);

  const emailInput = screen.getByRole("textbox", {
    name: /email:/i
  });

  userEvent.type(emailInput, "testuser@email.com");

  const passwordInput = screen.getByLabelText(/password:/i);

  userEvent.type(passwordInput, "P@ssword123");

  const loginButton = screen.getByRole("button", {
    name: /login/i
  });

  userEvent.click(loginButton);

  const greeting = await screen.findByText(/hello, fitzwilliam darcy!/i, {
    timeout: 1500
  });
});
