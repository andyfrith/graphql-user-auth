import React from "react";
import { RouteComponentProps } from "react-router-dom";
import styled, { css } from "react-emotion";
import { unit } from "../../styles";
import { Button, FormContainer } from "../../components";

interface Props extends RouteComponentProps {}

export const NotFound: React.FC<Props> = (props) => {
  return (
    <FormContainer>
      <Header />
      <Heading>404</Heading>
      <Button
        onClick={() => {
          props.history.push("/");
        }}
      >
        Login
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
