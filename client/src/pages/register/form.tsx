import React from "react";
import { FormEvent, useCallback, useState } from "react";
import styled, { css } from "react-emotion";
import { Button, Form, FormContainer, TextField } from "../../components";
import { unit } from "../../styles";
import * as RegisterTypes from "./__generated__/register";

interface Props {
  register: (a: { variables: RegisterTypes.registerVariables }) => void;
}

export const RegisterForm: React.FC<Props> = (props) => {
  const { register } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      register({ variables: { email, password } });
    },
    [email, password, register]
  );
  return (
    <FormContainer>
      <Header />
      <Heading>Register</Heading>
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
        <Button type="submit">Register</Button>
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
