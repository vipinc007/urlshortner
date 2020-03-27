import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Shortenurl from "./components/shortenurl";

function App() {
  return (
    <React.Fragment>
      {/* <Header /> */}
      <Shortenurl />
      {/* <Footer /> */}
    </React.Fragment>
  );
}

export default App;
