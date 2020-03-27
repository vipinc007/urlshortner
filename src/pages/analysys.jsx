import React, { Component } from "react";
import { apiurl } from "../settings/sitesettings.js";
import { Link } from "react-router-dom";

class Analysis extends Component {
  state = {
    url: [],
    loading: 1
  };
  async componentDidMount() {
    this.loadUrlAnalytics();
  }
  async loadUrlAnalytics() {
    this.setState({ url: [] });
    this.setState({ loading: 1 });

    let urlid = null;
    if (this.props.match.params != null) urlid = this.props.match.params.id;

    const response = await fetch(apiurl + "urlstatistic/" + urlid);
    const json = await response.json();
    this.setState({ url: json });
    this.setState({ baseurl: window.location.origin.toString() });
    this.setState({ loading: 0 });
    console.log(this.state.url);
  }
  render() {
    return (
      <React.Fragment>
        <div className="float-left">
          <h1 className="mt-5">Analysis</h1>
        </div>
        <div className="float-right">
          <button
            onClick={() => this.loadUrlAnalytics()}
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
          {this.state.url.map(ourl => (
            <React.Fragment>
              <table className="table table-hover table-sm">
                <thead>
                  <tr>
                    <th>url</th>
                    <th>Short url</th>
                    <th>Created On</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={ourl.id}>
                    <td>{ourl.url}</td>
                    <td>
                      <Link
                        to={"/a/" + ourl.ukey}
                        className="nav-link"
                        target="_blank"
                      >
                        {this.state.baseurl}/a/{ourl.ukey}
                      </Link>
                    </td>
                    <td>{ourl.createddate}</td>
                  </tr>
                </tbody>
              </table>
              {ourl.analysis.map(url => (
                <React.Fragment>
                  <h4>visit details</h4>
                  <table className="table table-hover table-sm">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>No of visits</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr key={url.thedate}>
                        <td>{url.thedate}</td>
                        <td>{url.access_count}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>
                          <table className="table table-hover table-sm">
                            <thead>
                              <tr>
                                <th>at</th>
                              </tr>
                            </thead>
                            <tbody>
                              {url.rows.map(r => (
                                <tr key={r.id}>
                                  <td>{r.accesseddate}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Analysis;
