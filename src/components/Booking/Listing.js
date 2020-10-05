import React from 'react';
import { Link } from 'react-router-dom';
import { capitalize, formatDate } from 'helpers/functions';
import { ApiError } from 'components';

const BookingListing = ({
  isFetching,
  errors,
  bookings,
  renderButton,
  type,
  title = 'Bookings'
}) => {
  return (
    <section className="booking-listing">
      <h2 className="page-title">{title}</h2>
      {!isFetching && bookings.length === 0 && (
        <p className="alert alert-info-box">No bookings created :(</p>
      )}
      <ApiError errors={errors} />
      <article className="bookings-card">
        {bookings.map((booking) => (
          <div className="booking-card" key={booking._id}>
            {/* {JSON.stringify(booking)} */}
            <div className="card">
              {type === 'received' && (
                <div className="card-header">From: {booking.user.username}</div>
              )}
              <div className="card-body">
                <h4 className="">
                  {booking.rental.title} - {capitalize(booking.rental.city)}{' '}
                </h4>
                <p className="">
                  {formatDate(booking.startAt)} - {formatDate(booking.endAt)} |{' '}
                  {booking.nights} nights
                </p>
                <p className="">
                  <span>Price: </span>{' '}
                  <span className="booking-price-value">${booking.price}</span>
                </p>
                <Link
                  to={{ pathname: `/rentals/${booking.rental._id}` }}
                  className="btn"
                >
                  Go to Rental
                </Link>
                {renderButton && renderButton(booking._id)}
              </div>
              <div className="card-footer">
                Created at {formatDate(booking.createdAt)}
              </div>
            </div>
          </div>
        ))}
      </article>
    </section>
  );
};

export default BookingListing;
