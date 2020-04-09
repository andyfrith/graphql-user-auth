import React from "react";
import { FormEvent, useCallback, useState } from "react";
import styled, { css } from "react-emotion";
import { Button, Form, FormContainer, TextField } from "../../components";
import { unit } from "../../styles";
import * as LoginTypes from "./__generated__/login";

interface Props {
  login: (a: { variables: LoginTypes.loginVariables }) => void;
  isLoginFailed?: boolean;
}

export const LoginForm: React.FC<Props> = (props) => {
  const { login, isLoginFailed } = props;
  const [email, setEmail] = useState("aaa@aaa.com");
  const [password, setPassword] = useState("aaa");

  const onPasswordChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    []
  );

  const onEmailChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    []
  );

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (email === "" || password === "") {
        return;
      }

      login({ variables: { email, password } });
    },
    [email, login, password]
  );
  return (
    <FormContainer>
      <Header />
      <Heading>Login</Heading>
      {isLoginFailed && <SubHeading>Login failed. Try again.</SubHeading>}
      <Form onSubmit={(e) => onSubmit(e)}>
        <TextField
          label="Email"
          type="text"
          name="email"
          placeholder="Enter your email address..."
          value={email}
          onChange={onEmailChange}
        />
        <TextField
          label="Password"
          type="text"
          name="email"
          placeholder="Enter your password..."
          value={password}
          onChange={onPasswordChange}
        />
        <Button type="submit">Log in</Button>
      </Form>
    </FormContainer>
  );
};

const svgClassName = css({
  display: "block",
  fill: "currentColor",
});

const Header = styled("header")(svgClassName, {
  width: "100%",
  marginBottom: unit * 5,
  padding: unit * 2.5,
  position: "relative",
});

const Heading = styled("h1")({
  margin: `${unit * 3}px 0 ${unit * 6}px`,
});

const SubHeading = styled("h4")({
  margin: `${unit * 3}px 0 ${unit * 6}px`,
});
