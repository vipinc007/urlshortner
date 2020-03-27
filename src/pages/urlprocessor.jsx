import React, { Component } from "react";
import { apiurl } from "../settings/sitesettings.js";
class Urlprocessor extends Component {
  state = {};
  async componentDidMount() {
    let urlid = null;
    if (this.props.match.params != null) urlid = this.props.match.params.ukey;

    const response = await fetch(apiurl + "url/" + urlid);
    const json = await response.json();
    //console.log(json);
    let rurl = json[0].url;
    let rurlid = json[0].id;
    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ urlid: rurlid })
    };
    let responseStatistics = await fetch(apiurl + "urlstatistics", config);
    let jsonstatistics = await responseStatistics.json();
    window.location.href = rurl;
  }
  render() {
    return <React.Fragment></React.Fragment>;
  }
}

export default Urlprocessor;
