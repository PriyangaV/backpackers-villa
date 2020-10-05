import React, { Component } from 'react';
import { fetchUserRentals, deleteRental } from 'actions';
import { connect } from 'react-redux';
import { Manage, ApiError } from 'components';
import { Link } from 'react-router-dom';

class ManageRentals extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUserRentals());
  }
  deleteRental = (rentalId) => {
    const canDelete = this.askForPermission();
    if (!canDelete) {
      return;
    }

    this.props.dispatch(deleteRental(rentalId));
  };
  askForPermission = () => {
    return window.confirm('Are you sure you want to delete this rental?');
  };
  render() {
    const { rentals, errors, isFetching } = this.props;
    return (
      <section className="section featured-section">
        <div className="section-title">
          <h1>Manage Rentals</h1>
          <div>
            <div className="line"></div>
          </div>
        </div>
        <div className="section-center">
          <ApiError errors={errors} />
          {rentals && rentals.length > 0 && (
            <div className="featured manage-featured">
              {rentals.map((rental, index) => {
                return (
                  <Manage
                    key={rental._id}
                    rental={rental}
                    index={index}
                    renderButton={() => (
                      <div className="tour-btns">
                        <button
                          className="btn"
                          onClick={() => this.deleteRental(rental._id)}
                        >
                          Delete
                        </button>
                        <Link
                          className="btn"
                          to={{ pathname: `/rentals/${rental._id}/edit` }}
                        >
                          update
                        </Link>
                      </div>
                    )}
                  />
                );
              })}
            </div>
          )}
          {!isFetching && rentals.length === 0 && (
            <p className="alert alert-info-box">No rentals :(</p>
          )}
        </div>
      </section>
    );
  }
}
const mapStateToProps = ({
  manage: {
    rentals: { items, isFetching, errors }
  }
}) => {
  return {
    rentals: items,
    isFetching,
    errors
  };
};

export default connect(mapStateToProps)(ManageRentals);
