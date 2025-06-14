import { COLOR } from "@/styles/color";

const mq = "@media (max-width: 800px)";

export const container = {
  minHeight: "100vh",

  display: "flex",
  flexDirection: "column" as const,
};

export const body = {
  flexGrow: 1,
  display: "flex",
};

const halfScreen = {
  flexShrink: 0,

  width: "50%",
  height: "calc(100vh - 4rem)",
  overflowY: "scroll" as const,
};

const scrollBar = {
  "::-webkit-scrollbar": {
    background: "transparent",
    width: "0.8rem",
  },

  "::-webkit-scrollbar-thumb": {
    background: COLOR.GRAY.STANDARD,
    width: "0.8rem",
    borderRadius: "0.2rem",
  },
};

const thinScrollBar = {
  "::-webkit-scrollbar": {
    background: "transparent",
    width: "0.6rem",
  },

  "::-webkit-scrollbar-thumb": {
    background: COLOR.GRAY.STANDARD,
    width: "0.6rem",
    borderRadius: "0.2rem",
  },
};

export const inputArea = {
  ...halfScreen,
  ...scrollBar,

  [mq]: {
    width: "100%",
    ...thinScrollBar,
  },
};

export const previewArea = {
  ...halfScreen,
  ...scrollBar,

  display: "flex",
  background: COLOR.LIGHT_GRAY.STANDARD,

  ...scrollBar,

  [mq]: {
    width: 0,
  },
};
