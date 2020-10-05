import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { RegisterForm, ApiError } from 'components';
import { registerUser } from 'actions';

class Register extends Component {
  state = {
    shouldRedirect: false,
    errors: []
  };

  signUp = (registerData) => {
    registerUser(registerData)
      .then(() => {
        this.setState({ shouldRedirect: true });
      })
      .catch((errors) => {
        this.setState({ errors });
      });
  };

  render() {
    const { shouldRedirect, errors } = this.state;
    if (shouldRedirect) {
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { message: 'You have been successfully registered!' }
          }}
        />
      );
    }
    return (
      <section className="section login-section">
        <div className="section-center login-container">
          <article className="login">
            <RegisterForm onSubmit={this.signUp} />
            <ApiError errors={errors} />
            <div className="login-link">
              <p>Already have an account?</p>
              <Link to="/login">
                Click here to <span>login</span>
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
export default Register;
