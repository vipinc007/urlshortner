import React, { Component } from "react";

class Footer extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <footer className="footer">
          <div className="container">
            <span className="text-muted">
              @ This is a test project for instacar by Vipin cheriyanveetil
            </span>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default Footer;
