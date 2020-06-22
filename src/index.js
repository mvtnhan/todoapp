import { Provider } from "react-redux";
import { render } from "react-dom";
import React from "react";

import { store } from "./store.js";
import App from "./App";

const Todo = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
render(<Todo />, document.getElementById("root"));
