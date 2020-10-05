import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { CreateForm, ApiError } from 'components';
import { createRental } from 'actions';

class Create extends Component {
  state = {
    shouldRedirect: false
  };
  handleCreateRental = (rentalData) => {
    createRental(rentalData)
      .then((_) => this.setState({ shouldRedirect: true }))
      .catch((_) => console.log('errors'));
  };
  render() {
    const { shouldRedirect } = this.state;
    if (shouldRedirect) {
      return (
        <Redirect
          to={{
            pathname: '/',
            state: { message: 'New rental has been successfully created!' }
          }}
        />
      );
    }
    return (
      <section className="section login-section">
        <div className="section-center login-container">
          <article className="login">
            <CreateForm onSubmit={this.handleCreateRental} />
            <ApiError />
          </article>
          <div className="login-wrapper banner">
            <div className="text">
              <h1>something</h1>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Create;
