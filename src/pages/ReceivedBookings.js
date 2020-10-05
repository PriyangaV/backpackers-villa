import React, { Component } from 'react';
import { Listing } from 'components';
import { connect } from 'react-redux';
import { fetchReceivedBookings } from 'actions';

class ReceivedBookings extends Component {
  componentDidMount() {
    this.props.dispatch(fetchReceivedBookings());
  }
  render() {
    const { bookings, isFetching, errors } = this.props;
    return (
      <section className="section booking-listing">
        <div className="section-center">
          <Listing
            type="received"
            isFetching={isFetching}
            errors={errors}
            title="My Received Bookings"
            bookings={bookings}
          />
        </div>
      </section>
    );
  }
}
const mapStateToProps = ({
  manage: {
    receivedBookings: { items, isFetching, errors }
  }
}) => {
  return {
    bookings: items,
    isFetching,
    errors
  };
};
export default connect(mapStateToProps)(ReceivedBookings);
