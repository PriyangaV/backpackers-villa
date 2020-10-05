import React, { Component } from 'react';
import { Listing } from 'components';
import { connect } from 'react-redux';
import { fetchUserBookings, deleteBooking } from 'actions';

class ManageBookings extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUserBookings());
  }
  deleteBooking = (bookingId) => {
    const canDelete = this.askForPermission();
    if (!canDelete) {
      return;
    }

    this.props.dispatch(deleteBooking(bookingId));
  };
  askForPermission = () => {
    return window.confirm('Are you sure you want to delete this booking?');
  };
  render() {
    const { bookings, isFetching, errors } = this.props;
    return (
      <section className="section booking-listing">
        <div className="section-center">
          <Listing
            title="My Bookings"
            bookings={bookings}
            isFetching={isFetching}
            errors={errors}
            renderButton={(bookingId) => (
              <button
                className="btn btn-secondary"
                onClick={() => this.deleteBooking(bookingId)}
              >
                Delete
              </button>
            )}
          />
        </div>
      </section>
    );
  }
}
const mapStateToProps = ({
  manage: {
    bookings: { items, isFetching, errors }
  }
}) => {
  return {
    bookings: items,
    isFetching,
    errors
  };
};
export default connect(mapStateToProps)(ManageBookings);
