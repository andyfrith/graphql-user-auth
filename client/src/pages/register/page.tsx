import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Loading } from "../../components";
import { RegisterForm } from "./form";
import * as RegisterTypes from "./__generated__/register";

export const REGISTER_USER = gql`
  mutation register($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
`;

interface Props extends RouteComponentProps {}

export const Register: React.FC<Props> = ({ history }) => {
  const [register, { loading, error }] = useMutation<
    RegisterTypes.register,
    RegisterTypes.registerVariables
  >(REGISTER_USER, {
    onCompleted({ register }) {
      if (register) {
        history.push("/");
      }
    },
  });

  if (loading) return <Loading />;
  if (error) return <p>An error occurred</p>;

  return <RegisterForm register={register} />;
};
