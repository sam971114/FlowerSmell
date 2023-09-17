import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; // Provider를 import 합니다.
import App from "./App";
import "./index.css";
import store from "./store"; // Redux 스토어를 import 합니다.

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
