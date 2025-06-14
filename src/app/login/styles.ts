import { COLOR } from "@/styles/color";

const breakpoints = [768];
const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

export const container = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  gap: "1rem",

  width: "100%",
  minHeight: "100vh",
  padding: "2rem",
  background: COLOR.LIGHT_GRAY.STANDARD,

  overflowY: "auto" as const,
};

export const title = {
  fontSize: "2rem",
  textAlign: "center" as const,
};

export const pageSizeAlert = {
  color: COLOR.PRIMARY.STANDARD,
  wordBreak: "keep-all" as const,
  textAlign: "center" as const,

  [mq[0]]: {
    display: "none",
  },
};

export const formContainer = {
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "center",
  gap: "1.5rem",

  width: "fit-content",
  height: "fit-content",
  padding: "3rem",
  paddingTop: "1.5rem",
  background: COLOR.WHITE.STANDARD,

  borderRadius: "1rem",
};
