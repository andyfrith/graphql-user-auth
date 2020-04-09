import styled from "react-emotion";
import { colors } from "../styles";

export default styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flexGrow: 1,
  color: "white",
  backgroundColor: colors.primary,
});
