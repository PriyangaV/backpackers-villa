import React, { Component } from 'react';
import { Card } from 'components';
import { connect } from 'react-redux';
import { fetchRentals } from 'actions';

class Rooms extends Component {
  componentDidMount() {
    // @ Reducers are executed whenever we dispatch the action
    this.props.dispatch(fetchRentals());
  }
  render() {
    const { rentals } = this.props;
    return (
      <section className="section featured-section" id="featured">
        <div className="section-title">
          <h1>Our best rooms</h1>
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
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ rentals: { items } }) => {
  return {
    // @ rentals: rentals
    rentals: items
  };
};
// @ HOC - Higher Order Component
export default connect(mapStateToProps)(Rooms);
