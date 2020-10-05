import React, { Component } from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { BpvModal, ApiError } from 'components';
import { createBooking, getBookings } from 'actions';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const moment = extendMoment(Moment);

class Reserve extends Component {
  constructor() {
    super();

    this.dateRef = React.createRef();
    this.bookedOutDates = [];

    this.state = {
      errors: [],
      proposedBooking: {
        guests: '',
        startAt: null,
        endAt: null
      }
    };
  }
  async componentDidMount() {
    const {
      rental: { _id }
    } = this.props;
    this.bookedOutDates = await getBookings(_id);

    /* const bookings = await getBookings(rental._id);
    this.initBookedOutDates(bookings);
    this.bookedOutDates.push(...bookings); */
  }

  /* initBookedOutDates = (bookings) => {
    bookings.forEach((booking) => this.bookedOutDates.push(booking));
  }; */

  // start 2020/03/04, end 2020/03/15
  // start 2020/03/07 - should not able to book

  checkInvalidDates = (date) => {
    let isBookedOut = false;
    isBookedOut = this.bookedOutDates.some((booking) => {
      return moment.range(booking.startAt, booking.endAt).contains(date);
    });

    // if date is invalid return true
    return date < moment().add(-1, 'days') || isBookedOut; // current day
  };
  handleGuestsChange = (event) => {
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        guests: parseInt(event.target.value, 10)
      }
    });
  };
  reserveRental = (closeCallback) => {
    createBooking(this.state.proposedBooking)
      .then((newBooking) => {
        this.bookedOutDates.push(newBooking);
        this.resetData();
        toast.success('Booking has successfully created!', {
          autoClose: 5000
        });
        closeCallback();
      })
      .catch((errors) => this.setState({ errors }));
  };

  resetData = () => {
    this.dateRef.current.value = '';
    this.setState({
      errors: [],
      proposedBooking: {
        guests: '',
        startAt: null,
        endAt: null
      }
    });
  };

  handleApply = (_, { startDate, endDate }) => {
    this.dateRef.current.value =
      moment(startDate).format('YYYY/MM/DD') +
      ' to ' +
      moment(endDate).format('YYYY/MM/DD');
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        startAt: startDate,
        endAt: endDate
      }
    });
  };

  get formattedDate() {
    return this.dateRef.current ? this.dateRef.current.value : '';
  }

  get isBookingValid() {
    const { startAt, endAt, guests } = this.state.proposedBooking;
    return startAt && endAt && guests;
  }

  get nights() {
    const { startAt, endAt } = this.state.proposedBooking;
    if (!startAt || !endAt) return null;
    const range = moment.range(startAt, endAt);
    return Array.from(range.by('days')).length - 1;
  }

  get price() {
    const {
      rental: { dailyPrice }
    } = this.props;
    return dailyPrice && this.nights * dailyPrice;
  }

  processAdditionalData = () => {
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        nights: this.nights,
        price: this.price,
        rental: this.props.rental
      }
    });
  };

  render() {
    const { rental, isAuth } = this.props;
    const {
      proposedBooking: { guests, nights, price },
      errors
    } = this.state;
    return (
      <div className="booking">
        <h3 className="booking-price">
          ${rental.dailyPrice}
          <span className="booking-per-night">per night</span>
        </h3>
        <hr />
        {!isAuth && (
          <Link className="btn" to="/login">
            Login to book this place!
          </Link>
        )}
        {isAuth && (
          <>
            <div className="form-group">
              <label htmlFor="dates">Dates</label>
              <DateRangePicker
                opens="left"
                containerStyles={{ display: 'block' }}
                onApply={this.handleApply}
                isInvalidDate={this.checkInvalidDates}
              >
                <input
                  id="dates"
                  type="text"
                  className="form-control"
                  autoComplete="off"
                  ref={this.dateRef}
                />
              </DateRangePicker>
            </div>
            <div className="form-group">
              <label htmlFor="guests">Guests</label>
              <input
                type="number"
                className="form-control"
                onChange={this.handleGuestsChange}
                id="guests"
                value={guests}
              ></input>
            </div>

            <BpvModal
              title={rental.title}
              subtitle={this.formattedDate}
              openBtn={
                <button
                  disabled={!this.isBookingValid}
                  className="btn"
                  onClick={this.processAdditionalData}
                >
                  Reserve place now
                </button>
              }
              onSubmit={this.reserveRental}
            >
              <p>
                <strong>
                  <em>{nights}</em>
                </strong>{' '}
                Nights /{' '}
                <strong>
                  <em> ${rental.dailyPrice}</em>
                </strong>{' '}
                per Night
              </p>
              <p>
                {guests === 1 ? 'Guest' : 'Guests'}:{' '}
                <strong>
                  <em>{guests}</em>
                </strong>
              </p>
              <p>
                Price:{' '}
                <strong>
                  <em>${price}</em>
                </strong>
              </p>
              <p>Do you confirm your booking for selected days?</p>
              <ApiError errors={errors} />
            </BpvModal>

            <div className="booking-details">
              <p>
                <em>2</em> Nights /<em> $12</em> per Night
              </p>
              <p>
                Guests: <em>3</em>
              </p>
              <p>
                Price: <em>$13</em>
              </p>
              <p>Do you confirm your booking for selected days?</p>
            </div>
          </>
        )}
        <hr />
        <p className="booking-note-title">Save 5% with membership</p>
        <p className="booking-note-text">
          Get upto 10% off on successive bookings
        </p>
        <p>No booking or credit card fees!</p>
        <p>Free Cancelation</p>
        <p>
          You can change or cancel this stay if plans change. Because
          flexibility matters.
        </p>
      </div>
    );
  }
}

export default Reserve;
