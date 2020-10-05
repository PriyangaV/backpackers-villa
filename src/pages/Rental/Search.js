import React, { Component } from 'react';
import { Card } from 'components';
import { connect } from 'react-redux';
import { fetchRentals } from 'actions';
import { withRouter } from 'react-router-dom';
import { capitalize } from 'helpers/functions';

class Search extends Component {
  componentDidMount() {
    this.getRentals(this.location);
  }

  getRentals(location) {
    this.props.dispatch(fetchRentals(location));
  }

  componentDidUpdate(prevProps) {
    const { location: prevLocation } = prevProps.match.params;

    if (this.location !== prevLocation) {
      this.getRentals(this.location);
    }
  }

  get location() {
    return this.props.match.params.location;
  }

  get noRentalsFound() {
    const { rentals, isFetching } = this.props;
    return rentals.length === 0 && !isFetching;
  }
  render() {
    const { rentals } = this.props;
    return (
      <section className="section search-section" id="featured">
        <div className="section-title">
          <h2>Your homes in "{capitalize(this.location)}" </h2>
          <div>
            <div className="line"></div>
          </div>
        </div>
        <div className="section-center">
          {rentals && rentals.length > 0 && (
            <div className="featured">
              {rentals.map((rental, index) => {
                return <Card key={rental._id} rental={rental} index={index} />;
              })}
            </div>
          )}

          {this.noRentalsFound && (
            <p className="alert-info-box">No rentals found :(</p>
          )}
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ rentals: { items, isFetching } }) => {
  return {
    // @ rentals: rentals
    rentals: items,
    isFetching
  };
};
// @ HOC - Higher Order Component
export default connect(mapStateToProps)(withRouter(Search));
