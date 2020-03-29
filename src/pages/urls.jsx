import React, { Component } from "react";
import { Link } from "react-router-dom";
import Dataholder from "../common/dataholder";

class Urls extends Component {
  state = {
    urls: [],
    baseurl: "",
    loading: 1
  };
  async componentDidMount() {
    this.loadUrls();
  }
  async loadUrls() {
    this.setState({ urls: [] });
    this.setState({ loading: 1 });

    const response = await fetch(Dataholder.getApiUrl() + "urls");
    const json = await response.json();
    this.setState({ urls: json });
    this.setState({ baseurl: Dataholder.getBaseUrl() });
    this.setState({ loading: 0 });
  }
  render() {
    return (
      <React.Fragment>
        <div className="float-left">
          <h1 className="mt-5">List of urls</h1>
        </div>
        <div className="float-right">
          <button
            onClick={() => this.loadUrls()}
            type="button"
            className="btn btn-light mt-5"
            disabled={this.state.loading === 1}
          >
            Refresh
          </button>
        </div>
        <div className="table-responsive">
          {this.state.loading === 1 && (
            <React.Fragment>
              <div className="alert alert-info">
                <strong>Info!</strong> We are loading the available info.
              </div>
            </React.Fragment>
          )}
          <table className="table table-hover table-sm">
            <thead>
              <tr>
                <th>Url</th>

                <th>Created Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.urls.map(url => (
                <tr key={url.id}>
                  <td>
                    {url.url}
                    <br />
                    <Link
                      to={"/a/" + url.ukey}
                      className="nav-link"
                      target="_blank"
                    >
                      {this.state.baseurl}/a/{url.ukey}
                    </Link>
                  </td>

                  <td>{url.createddate}</td>
                  <td>
                    <Link
                      to={"/analysis/" + url.id}
                      className="btn btn-success btn-sm"
                    >
                      Analysis
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default Urls;
