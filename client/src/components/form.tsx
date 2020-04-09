import * as React from "react";
import styled from "react-emotion";
import { colors, unit } from "../styles";

interface Props
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {}

const StyledForm = styled("form")({
  width: "100%",
  maxWidth: 406,
  padding: unit * 3.5,
  borderRadius: 3,
  boxShadow: "6px 6px 1px rgba(0, 0, 0, 0.25)",
  color: colors.text,
  backgroundColor: "white",
});

export const Form: React.FC<Props> = (props) => {
  const { ...formProps } = props;
  return <StyledForm {...(formProps as any)} />;
};
