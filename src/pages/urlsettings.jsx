import React, { Component } from "react";
import Dataholder from "../common/dataholder";

class Urlsettings extends Component {
  state = {
    ratelimit: "",
    loading: 1,
    status: 0
  };
  async componentDidMount() {
    this.loadSettings();
  }
  async loadSettings() {
    this.setState({ ratelimit: 1 });
    this.setState({ loading: 1 });

    const response = await fetch(Dataholder.getApiUrl() + "settings");
    const json = await response.json();

    this.setState({ ratelimit: json[0].ratelimit });
    this.setState({ loading: 0 });
  }
  render() {
    return (
      <React.Fragment>
        <h1 className="mt-5">Settings</h1>
        <form className="mt-5">
          <div className="form-group">
            <label>Rate Limit per IP for a day:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter rate per ip"
              name="ratelimit"
              onChange={e => this.handleChange(e)}
              value={this.state.ratelimit}
            />
          </div>

          <button
            disabled={
              this.state.loading === 1 ||
              this.state.ratelimit === null ||
              this.state.ratelimit.length === 0
            }
            type="button"
            className="btn btn-primary"
            onClick={this.handleSaveSettings}
          >
            Save Changes
          </button>
          {this.state.loading === 1 && (
            <React.Fragment>
              <div className="row">&nbsp;</div>
              <div className="alert alert-info">
                <strong>Info!</strong> We are loading the form
              </div>
            </React.Fragment>
          )}
          {this.state.status === 2 && (
            <React.Fragment>
              <div className="row">&nbsp;</div>
              <div className="alert alert-success">
                <strong>Success!</strong> You Changes are saved.
              </div>
            </React.Fragment>
          )}
          {this.state.status === 3 && (
            <React.Fragment>
              <div className="alert alert-warning">
                <strong>Failure!</strong> Oops ! An error occured.
              </div>
            </React.Fragment>
          )}
        </form>
      </React.Fragment>
    );
  }
  async handleChange(e) {
    await this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSaveSettings = () => {
    this.setState({
      status: 1
    });
    this.saveSetting(this.state);
  };

  saveSetting = async data => {
    try {
      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
      const response = await fetch(Dataholder.getApiUrl() + "settings", config);
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

export default Urlsettings;
