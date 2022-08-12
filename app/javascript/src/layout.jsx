// layout.js
import React from 'react';
import { handleErrors } from '@utils/fetchHelper';

class Layout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      sessionId: 0,
      loginClassName: "",
      logoutClassName: "d-none",
    };

    this.doLogout = this.doLogout.bind(this);
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
          sessionId: data.sessionId,
          loginClassName : data.authenticated ? "d-none" : "",
          logoutClassName : data.authenticated ? "" : "d-none",
        })
      })
  }

  doLogout(e) {
    e.preventDefault(); 
    fetch(`/api/sessions/${this.state.sessionId}`, {
      method: 'DELETE',
    })
    .then(handleErrors)
    .then(data => {
      this.setState({
        authenticated: false,
        sessionId: 0,
        loginClassName : "",
        logoutClassName : "d-none",
      })
    });
    return false;
  }

  render () {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand text-danger" href="/">Airbnb</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/">Home</a>
                </li>
                <li>
                <a className="nav-link" href="/trips">
                  Trips
                </a>
              </li>
              <li>
                <a className="nav-link" href="/host">
                  Host
                </a>
              </li>
                <li>
                <a className="nav-link" href="/myproperties">
                  My properties
                </a>
              </li>
              </ul>
              <ul className="navbar-nav me-2">
                <li className={this.state.loginClassName} >
                  <a className="nav-link" href="/login">
                    Log in
                  </a>
                </li>
                <li className={this.state.logoutClassName} >
                  <a className="nav-link" href="" onClick={this.doLogout}>
                    Log out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {this.props.children}
        <footer className="p-3 bg-light">
          <div>
            <p className="me-3 mb-0 text-secondary">Airbnb Clone</p>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default Layout;
