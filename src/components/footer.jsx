import React, { Component } from "react";
import Dataholder from "../common/dataholder";

class Footer extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <footer className="footer">
          <div className="container">
            <span className="text-muted">
              @ A test project by Vipin cheriyanveetil.
              {Dataholder.getIpAddress() !== "" && (
                <React.Fragment>
                  Your ip is {Dataholder.getIpAddress()}
                </React.Fragment>
              )}
            </span>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default Footer;
