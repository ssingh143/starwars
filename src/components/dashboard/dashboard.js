import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import { userActions } from "../../actions";
import { SearchBar } from "../search/SearchBar";

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        <nav className="navbar bg-dark navbar-dark">
          <div className="container">
            <div className="navbar-brand">
              <i className="fa fa-rebel" /> Welcome!{" "}
              <span className="red">{user.firstName}</span>
            </div>
            <ul className="navbar-nav pull-right">
              <li className="nav-item">
                <button className="logout" onClick={this.props.logout}>
                  <i className="fa fa-user-circle" /> Logout!
                </button>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container">
          <SearchBar />
        </div>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
  getUser: PropTypes.func
};

const mapStateToProps = state => {
  const { auth } = state;
  const { user } = auth;
  return { user };
};

const mapDispatchToProps = {
  logout: userActions.logout,
  getUser: userActions.getUser
};

const connectedDashboardPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export { connectedDashboardPage as Dashboard };
