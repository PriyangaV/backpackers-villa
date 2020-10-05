import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { fetchRentalById, verifyRentalOwner, updateRental } from 'actions';
import { capitalize } from 'helpers/functions';
import {
  TomMap,
  Assets,
  EditableInput,
  EditableTextarea,
  EditableSelect,
  EditableImage
} from 'components';
import { toast } from 'react-toastify';
import { FaBed, FaUser, FaBuilding } from 'react-icons/fa';

const withUserCheck = (Component) => (props) => {
  const [guard, setGuard] = useState({ canProceed: false, isChecking: true });
  const { id } = props.match.params;

  useEffect(() => {
    verifyRentalOwner(id)
      .then((_) => setGuard({ canProceed: true, isChecking: false }))
      .catch((_) => setGuard({ canProceed: false, isChecking: false }));
  }, [id]);

  const { canProceed, isChecking } = guard;

  if (!isChecking && canProceed) {
    return <Component {...props} />;
  } else if (!isChecking && !canProceed) {
    return <Redirect to={{ pathname: '/' }} />;
  } else {
    return <h1>Loading...</h1>;
  }
};

class Edit extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch(fetchRentalById(id));
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
  updateRental = (rentalData, onSuccess, onError) => {
    const { id } = this.props.match.params;
    // return this.props.dispatch(updateRental(id, rentalData));
    this.props
      .dispatch(updateRental(id, rentalData))
      .then(() => {
        onSuccess();
      })
      .catch((errors) => {
        const message =
          errors.length > 0
            ? errors[0].detail
            : 'Oopsss, something went wrong!';
        toast.error(message, {
          autoClose: 5000
        });
        onError();
      });
  };
  render() {
    const { rental, isFetching } = this.props;
    if (isFetching || !rental._id) return null;

    return (
      <section className="section rental-section">
        <div className="section-center single-rental">
          <div className="media-location-container">
            <div className="img-container">
              {/* <img
                src={rental.image.url}
                alt={rental.title}
                className="single-rental-image"
              /> */}
              <EditableImage
                entity={rental}
                field={'image'}
                transformView={(image) => image.url}
                onUpdate={this.updateRental}
              />
            </div>
            <div className="map-container">
              <TomMap location={this.location} />
            </div>
          </div>
          <div className="details">
            <article>
              <span>Is Shared: </span>
              <EditableSelect
                entity={rental}
                options={[true, false]}
                inline={true}
                field={'shared'}
                className={`sub-info type-${rental.category}`}
                onUpdate={this.updateRental}
              />
              <EditableSelect
                entity={rental}
                field={'category'}
                options={['apartment', 'condo', 'house']}
                className={`sub-info type-${rental.category}`}
                transformView={(value) => capitalize(value)}
                onUpdate={this.updateRental}
              />
              <EditableInput
                entity={rental}
                field={'title'}
                onUpdate={this.updateRental}
              />
              <EditableInput
                entity={rental}
                field={'city'}
                className={'city'}
                transformView={(value) => capitalize(value)}
                onUpdate={this.updateRental}
              />
              <EditableInput
                entity={rental}
                field={'street'}
                transformView={(value) => capitalize(value)}
                onUpdate={this.updateRental}
              />
              <EditableInput
                entity={rental}
                field={'dailyPrice'}
                className={'price'}
                additionalContent={'per Night'}
                onUpdate={this.updateRental}
              />
              <div className="bed-details">
                <span>
                  <FaBuilding />
                  <EditableInput
                    entity={rental}
                    field={'numOfRooms'}
                    className={''}
                    inline={true}
                    onUpdate={this.updateRental}
                  />{' '}
                  bedrooms
                </span>{' '}
                <span>
                  <FaUser />
                  {rental.numOfRooms + 4} guests
                </span>
                <span>
                  <FaBed />
                  {rental.numOfRooms + 2} beds
                </span>
              </div>
              <EditableTextarea
                entity={rental}
                field={'description'}
                className={'description'}
                inline={false}
                onUpdate={this.updateRental}
                rows={10}
                cols={30}
              />{' '}
              <hr />
              <Assets />
            </article>
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

const RentalEditWithRouterAndCheck = withRouter(withUserCheck(Edit));
export default connect(mapStateToProps)(RentalEditWithRouterAndCheck);
