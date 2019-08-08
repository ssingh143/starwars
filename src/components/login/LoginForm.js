import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Redirect } from "react-router-dom";

import { userActions } from "../../actions";
import { userConstants as CONFIG } from "../../constants";
import TextFieldGroup from "../common/TextFieldGroup";
import LoadingSpinner from "../common/Loader";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      usernameError: "",
      passwordError: "",
      submitted: false
    };
  }

  componentDidMount() {
    this.props.isUserLoggedIn();
    if (this.props.loggingIn) {
      return <Redirect to="/" />;
    }
  }

  validate = () => {
    let isError = false;
    const errors = {
      usernameError: "",
      passwordError: ""
    };

    if (this.state.username.length < 2) {
      isError = true;
      errors.usernameError = CONFIG.INVALID_USER;
    }

    if (this.state.password.length < 2) {
      isError = true;
      errors.passwordError = CONFIG.INVALID_PASS;
    }

    this.setState({
      ...this.state,
      ...errors
    });

    return isError;
  };

  onSubmit = e => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      this.setState({
        usernameError: "",
        passwordError: ""
      });
      this.props.formSubmit(true);
      const { username, password } = this.state;
      if (username && password) {
        this.props.login(username, password);
      }
    }
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, usernameError, passwordError, password } = this.state;
    const { alert, submitted } = this.props;
    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit}>
          <div className="alert-container">
            {alert && alert.message && (
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            )}
          </div>
          <TextFieldGroup
            field="username"
            label="Username"
            id="username"
            name="unsername"
            value={username}
            error={usernameError}
            onChange={this.onChange}
          />

          <TextFieldGroup
            field="password"
            label="Password"
            id="Password"
            value={password}
            error={passwordError}
            onChange={this.onChange}
            type="password"
          />

          <div className="form-group">
            <button className="btn btn-primary-login" disabled={submitted}>
              {submitted ? (
                <LoadingSpinner message={"Submitting..."} />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func,
  isUserLoggedIn: PropTypes.func,
  formSubmit: PropTypes.func,
  loggingIn: PropTypes.bool,
  alert: PropTypes.object,
  submitted: PropTypes.bool
};

const mapStateToProps = state => {
  const { loggingIn } = state.auth;
  const { alert } = state;
  const { submitted } = state.form;
  return { loggingIn, alert, submitted };
};

const dispatchStateToProps = {
  login: userActions.login,
  isUserLoggedIn: userActions.getUser,
  formSubmit: userActions.loadUser
};

const connectedLoginPage = connect(
  mapStateToProps,
  dispatchStateToProps
)(LoginForm);
export { connectedLoginPage as LoginForm };
