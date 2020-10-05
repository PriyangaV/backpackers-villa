import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRentalById } from 'actions';
import { Info, TomMap, Reserve } from 'components';

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
          <div className="media-location-container">
            <div className="img-container">
              <img
                src={rental.image.url}
                alt={rental.title}
                className="single-rental-image"
              />
            </div>
            <div className="map-container">
              <TomMap location={this.location} />
            </div>
          </div>
          <div className="details">
            <Info rental={rental} />
            <Reserve rental={rental} isAuth={isAuth} />
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
