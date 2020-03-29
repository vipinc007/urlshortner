import React, { Component } from "react";
import Dataholder from "../common/dataholder";

class Urlprocessor extends Component {
  state = {
    rateexceeded: false
  };
  async componentDidMount() {
    let urlid = null;
    if (this.props.match.params != null) urlid = this.props.match.params.ukey;

    const response = await fetch(Dataholder.getApiUrl() + "url/" + urlid);
    const json = await response.json();
    let rurl = json[0].url;
    let rurlid = json[0].id;

    let ipaddress = Dataholder.getIpAddress();

    const rateconfig = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ urlid: rurlid, ipaddress: ipaddress })
    };
    let rateStatistics = await fetch(
      Dataholder.getApiUrl() + "checkratelimit",
      rateconfig
    );
    let jsonRate = await rateStatistics.json();
    if (!jsonRate.exceeded) {
      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ urlid: rurlid, ipaddress: ipaddress })
      };
      let responseStatistics = await fetch(
        Dataholder.getApiUrl() + "urlstatistics",
        config
      );
      let jsonstatistics = await responseStatistics.json();
      window.location.href = rurl;
    } else {
      this.setState({ rateexceeded: jsonRate.exceeded });
    }
  }
  render() {
    return (
      <React.Fragment>
        {this.state.rateexceeded && (
          <React.Fragment>
            <div className="alert alert-error">
              <strong>Error!</strong> Daily Limit exceeded.
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Urlprocessor;
