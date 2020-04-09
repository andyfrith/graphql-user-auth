import * as React from "react";
import styled from "react-emotion";
import { colors, unit } from "../styles";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
}
const StyledInput = styled("input")({
  width: "100%",
  marginBottom: unit * 2,
  padding: `${unit * 1.25}px ${unit * 2.5}px`,
  border: `1px solid ${colors.grey}`,
  fontSize: 16,
  outline: "none",
  ":focus": {
    borderColor: colors.primary,
  },
});

export const TextField: React.FC<Props> = (props) => {
  const { label, ...inputProps } = props;
  return <StyledInput {...(inputProps as any)} />;
};
