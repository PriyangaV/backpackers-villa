import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRentalById } from 'actions';
import { Info, TomMap, Reserve, Reviews, Assets } from 'components';
import { capitalize } from 'helpers/functions';
import { FaMapMarkerAlt } from 'react-icons/fa';

class RentalDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch(fetchRentalById(id)); // ! Reducers are executed whenever we dispatch the action
  }
  componentWillUnmount() {
    this.props.dispatch({ type: 'UNMOUNT_RENTAL' });
  }
  get location() {
    const {
      rental: { street, city }
    } = this.props;
    return street && city && city + ', ' + street;
  }
  render() {
    const { rental, isFetching, isAuth } = this.props;
    if (isFetching || !rental._id) return null;

    return (
      <section className="section rental-section">
        <div className="section-center single-rental">
          <div className="title-container">
            <div className="title-info">
              <h1>{rental.title}</h1>
              <p className="city">
                <FaMapMarkerAlt />
                <span>{capitalize(rental.city)}</span>
                <span className={`sub-info type-${rental.category}`}>
                  {rental.shared ? 'Shared ' : 'Whole '}
                  {rental.category}
                </span>
              </p>
            </div>
            {rental.owner && (
              <div className="rental-owner">
                <img
                  src="https://api.adorable.io/avatars/285/abott@adorable.png"
                  alt={rental.owner.email}
                />
                <span>{rental.owner.username}</span>
              </div>
            )}
          </div>
          <div className="media-location-container">
            <div className="img-container">
              <img
                src={rental.image.url}
                alt={rental.title}
                className="single-rental-image"
              />
            </div>
            <div className="map-container">
              <Reviews />
            </div>
          </div>
          <div className="details">
            <Info rental={rental} />
          </div>
          <div className="details">
            <TomMap location={this.location} />
            <Reserve rental={rental} isAuth={isAuth} />
          </div>
          <div className="reservation-form details">
            <Assets />
            <div className="rules">
              <h3 className="assets">Policies</h3>
              <div className="check-in-out">
                <h5>Check-in/Check-out</h5>
                <p>Check-in from: 15:00</p>
                <p>Check-out until: 11:00</p>
              </div>
              <div className="property">
                <h5>The property</h5>
                <p>Number of floors: 8 </p>
                <p>Number of rooms : 998</p>
                <p>Most recent renovation: 2019</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

// - HOC

const mapStateToProps = ({
  rental: { item, isFetching },
  auth: { isAuth }
}) => ({
  rental: item,
  isFetching,
  isAuth
});

const RentalDetailWithRouter = withRouter(RentalDetail);
export default connect(mapStateToProps)(RentalDetailWithRouter);
