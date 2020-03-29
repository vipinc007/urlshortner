import React, { Component } from "react";
import Dataholder from "../common/dataholder";

class Shortenurl extends Component {
  state = {
    url: "",
    shorturl: "",
    processing: true,
    status: 0,
    baseurl: "",
    ukey: null
  };

  async componentDidMount() {
    this.setState({ baseurl: Dataholder.getBaseUrl() });
    if (Dataholder.getIpAddress() == null) {
      const ipresponse = await fetch("https://api.ipify.org/?format=json");
      const ipjson = await ipresponse.json();
      //console.log(ipjson.ip);
      let ipaddress = ipjson.ip;
      Dataholder.setIpAddress(ipaddress);
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="mt-5">Enter you url</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter your lengthy url here"
            aria-label="Enter your lengthy url here"
            aria-describedby="basic-addon2"
            name="url"
            onChange={e => this.handleChange(e)}
          />
          <div className="input-group-append">
            <button
              onClick={this.handleShortenurl}
              className="btn btn-outline-secondary"
              type="button"
              disabled={this.state.url.length === 0}
            >
              Shorten It!
            </button>
          </div>
        </div>
        {this.state.status === 1 && (
          <React.Fragment>
            <div className="alert alert-info">
              <strong>Info !</strong> We are shortening your url. Please wait
              ....
            </div>
          </React.Fragment>
        )}
        {this.state.status == 2 && (
          <React.Fragment>
            <div className="alert alert-success">
              <strong>Success!</strong> Your short url is generated.
            </div>
            <input
              type="text"
              className="form-control"
              readOnly
              value={this.state.shorturl}
            />
          </React.Fragment>
        )}
        {this.state.status == 3 && (
          <React.Fragment>
            <div className="alert alert-warning">
              <strong>Failure!</strong> Oops ! An error occured.
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }

  generateShortUrl = () => {
    let randstring = Dataholder.generateRandomString(10);
    let surl = this.state.baseurl + "/a/" + randstring;
    this.setState({ shorturl: surl, ukey: randstring });
  };
  async handleChange(e) {
    await this.setState({
      [e.target.name]: e.target.value
    });
    await this.generateShortUrl();
  }
  handleShortenurl = () => {
    this.setState({
      status: 1
    });
    this.addUrl(this.state);
  };

  addUrl = async data => {
    try {
      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
      const response = await fetch(Dataholder.getApiUrl() + "urls", config);
      if (response.ok) {
        const ores = await response.json();
        this.setState({
          status: 2
        });
      } else {
        this.setState({
          status: 3
        });
      }
    } catch (error) {
      this.setState({
        status: 3
      });
    }
  };
}

export default Shortenurl;
