import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { RouteComponentProps } from "react-router-dom";
import styled, { css } from "react-emotion";
import { unit } from "../../styles";
import { Button, FormContainer, Loading } from "../../components";
import * as UserTypes from "./__generated__/me";
import * as LogoutTypes from "./__generated__/logout";

export const LOGOUT_USER = gql`
  mutation logout {
    logout
  }
`;

export const GET_LOGGED_IN_USER = gql`
  query me {
    me {
      id
      email
    }
  }
`;

interface Props extends RouteComponentProps {}

export const Home: React.FC<Props> = ({ history }) => {
  const { data, loading, error } = useQuery<UserTypes.me>(GET_LOGGED_IN_USER);
  const [logout] = useMutation<LogoutTypes.logout>(LOGOUT_USER, {
    onCompleted({ logout }) {
      if (logout) {
        history.push("/login");
      }
    },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>no data</div>;
  }

  return (
    <FormContainer>
      <Header />
      <Heading>{JSON.stringify(data)}</Heading>
      <Button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </Button>
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
