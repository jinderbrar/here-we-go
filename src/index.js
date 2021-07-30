import React from "react";
import ReactDOM from "react-dom";

import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

import { Provider } from "react-redux";

import App from "./App";
import theme from "./theme";

import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <App />
      </CssBaseline>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
