import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import blueGrey from "@material-ui/core/colors/blueGrey";

const theme = createMuiTheme({
  palette: {
    shadesOfRed: {
      light: "#ff6059",
      redViolet: "#c71585",
    },
    shadesOfYellow: {
      light: "#ffbd2e",
    },
    shadesOfGreen: {
      light: "#28ca42",
    },
    shadesOfGrey: {
      light: "#cbcbcb",
    },
    shadesOfBlue: {
      dark: "#262262",
    },
    shadesOfPurple: {
      light: "#745fb5",
    },
    containerBackground: {
      dark: "white",
    },
  },
  typography: {
    fontFamily: ["Fira Code"].join(","),
    icons: {
      fontSize: "22px",
    },
  },
  status: {
    scroll: blueGrey[50],
    play: "#089c8c",
    pause: "#f77452",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "*": {
          "scrollbar-width": "thin",
          fontSize: 12,
        },
        "*::-webkit-scrollbar": {
          width: 4,
          height: 4,
          backgroundColor: "transparent",
        },
        "*::-webkit-scrollbar-thumb": {
          borderRadius: 4,
          backgroundColor: blueGrey[100],
          zIndex: "2",
        },
        "*::-webkit-scrollbar-thumb:hover": {
          backgroundColor: blueGrey[200],
        },
      },
    },
  },
});

export default theme;
