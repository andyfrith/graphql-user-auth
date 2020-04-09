import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Loading } from "../../components";
import { setAccessToken } from "../../accessToken";
import { LoginForm } from "./form";
import * as LoginTypes from "./__generated__/login";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      user {
        id
        email
      }
    }
  }
`;

interface Props extends RouteComponentProps {}

export const Login: React.FC<Props> = ({ history }) => {
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const [login, { loading, error }] = useMutation<
    LoginTypes.login,
    LoginTypes.loginVariables
  >(LOGIN_USER, {
    onCompleted({ login }) {
      console.log("here", login);
      if (login) {
        setAccessToken(login.accessToken!);
        setIsLoginFailed(false);
        history.push("/");
      } else {
        setIsLoginFailed(true);
      }
    },
  });

  if (loading) return <Loading />;
  if (error) return <p>An error occurred</p>;

  return <LoginForm login={login} isLoginFailed={isLoginFailed} />;
};
