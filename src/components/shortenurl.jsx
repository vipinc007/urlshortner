import React, { Component } from "react";
import { apiurl } from "../settings/sitesettings.js";
class Shortenurl extends Component {
  state = {
    url: "",
    shorturl: "",
    processing: true,
    status: 0,
    baseurl: "",
    ukey: null
  };
  componentDidMount() {
    this.setState({ baseurl: window.location.origin.toString() });
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="mt-5">Enter you url</h1>
        {/* <p className="lead">
            Pin a fixed-height footer to the bottom of the viewport in desktop
            browsers with this custom HTML and CSS. A fixed navbar has been
            added with <code>padding-top: 60px;</code> on the{" "}
            <code>body &gt; .container</code>.
          </p> */}

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

        {this.state.status == 2 && (
          <React.Fragment>
            <div className="alert alert-success">
              <strong>Success!</strong> Your short url is below.
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
  generateRandomString(len, arr) {
    var ans = "";
    for (var i = len; i > 0; i--) {
      ans += arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
  }
  generateShortUrl = () => {
    let randstring = this.generateRandomString(
      10,
      "1234567890abcdefghijklmnopqrsABCDEFGHIJKLMNOPQRSTUVWXYZ"
    );
    let surl = this.state.baseurl + "/a/" + randstring;
    this.setState({ shorturl: surl, ukey: randstring });
    //console.log(surl);
  };
  async handleChange(e) {
    await this.setState({
      [e.target.name]: e.target.value
    });
    await this.generateShortUrl();
    //console.log(this.state);
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
      const response = await fetch(apiurl + "urls", config);
      if (response.ok) {
        const ores = await response.json();
        // console.log(ores);
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
