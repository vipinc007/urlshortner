import React, { Component } from "react";
import { Link } from "react-router-dom";
import Dataholder from "../common/dataholder";

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

    const response = await fetch(
      Dataholder.getApiUrl() + "urlstatistic/" + urlid
    );
    const json = await response.json();
    this.setState({ url: json });
    this.setState({ baseurl: Dataholder.getBaseUrl() });
    this.setState({ loading: 0 });
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
              <div className="row">&nbsp;</div>
              <h4>Url details</h4>
              <table key={ourl} className="table table-hover table-sm">
                <thead>
                  <tr>
                    <th>url</th>
                    <td>{ourl.url}</td>
                  </tr>
                  <tr>
                    <th>Short url</th>
                    <td>
                      <Link to={"/a/" + ourl.ukey} target="_blank">
                        {this.state.baseurl}/a/{ourl.ukey}
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <th>Created On</th>
                    <td>{ourl.createddate}</td>
                  </tr>
                </thead>
              </table>
              {ourl.analysis.map(url => (
                <React.Fragment>
                  <div className="row">&nbsp;</div>
                  <div key={url.id}>
                    <h4>
                      visit details for <strong>{url.thedate}</strong>{" "}
                    </h4>
                    <table className="table table-hover table-sm">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>No of visits</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr key={url}>
                          <td>{url.thedate}</td>
                          <td>{url.access_count}</td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <table className="table table-hover table-sm">
                              <thead>
                                <tr>
                                  <th>From IP</th>
                                  <th>Time</th>
                                </tr>
                              </thead>
                              <tbody>
                                {url.rows.map(r => (
                                  <tr key={r.id}>
                                    <td>{r.ipaddress}</td>
                                    <td>{r.accesseddate}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
