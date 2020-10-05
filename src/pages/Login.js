import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { LoginForm, ApiError } from 'components';
// import { loginUser } from 'actions';
import { withAuth } from 'providers/AuthProvider';
import { connect } from 'react-redux';

class Login extends Component {
  /* loginUser = (loginData) => {
    console.log(loginData, 'from Login Component');
  }; */
  constructor() {
    super();
    this.state = {
      shouldRedirect: false,
      errors: []
    };
  }

  signIn = (loginData) => {
    this.props.auth
      .signIn(loginData)
      .then((_) => this.setState({ shouldRedirect: true }))
      .catch((errors) => this.setState({ errors }));
  };
  render() {
    const { shouldRedirect, errors } = this.state;
    const { message } = this.props.location.state || '';
    if (shouldRedirect) {
      return <Redirect to={{ pathname: '/' }} />;
    }
    return (
      <section className="section login-section">
        <div className="section-center login-container">
          <article className="login">
            {message && <div className="alert-success-box">{message}</div>}
            <LoginForm onSubmit={this.signIn} />
            <ApiError errors={errors} />
            <div className="register-link">
              <p>New to Backpackers Villa?</p>
              <Link to="/register">
                Click here to <span>register</span>
              </Link>
            </div>
          </article>
          <div className="login-wrapper banner">
            <div className="text">
              <h1>Welcome</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatum voluptas, nobis illum adipisci consequatur at.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default connect()(withAuth(Login));
