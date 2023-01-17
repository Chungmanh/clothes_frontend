import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyles from "./components/GlobalStyles";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "./store/Provider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GlobalStyles>
    <Router>
      <Provider>
        <App />
      </Provider>
    </Router>
  </GlobalStyles>
);

reportWebVitals();
