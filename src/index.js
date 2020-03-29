import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import "./index.css";
import App from "./App";
import Urls from "./pages/urls";
import Analysis from "./pages/analysys";
import Urlprocessor from "./pages/urlprocessor";
import Notfound from "./pages/notfound";
import Header from "./components/header";
import Footer from "./components/footer";
import Urlsettings from "./pages/urlsettings";
import * as serviceWorker from "./serviceWorker";

const routing = (
  <Router>
    <Header />
    <main
      role="main"
      className="container"
      style={{ height: 500, overflow: "auto" }}
    >
      <div className="row">&nbsp;</div>
      <div className="row">&nbsp;</div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/urls" component={Urls} />
        <Route exact path="/a/:ukey" component={Urlprocessor} />
        <Route exact path="/analysis/:id" component={Analysis} />
        <Route exact path="/settings" component={Urlsettings} />
        <Route component={Notfound} />
      </Switch>
    </main>
    <Footer />
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
