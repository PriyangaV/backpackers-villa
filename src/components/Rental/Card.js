import React from 'react';
import { Link } from 'react-router-dom';

const RentalCard = ({ rental, index, renderButton }) => {
  return (
    <article className={`tour-card tour-card-${index}`}>
      <div className="tour-img-container">
        <img src={rental.image.url} className="tour-img" alt="tour-img" />
      </div>
      <div className="tour-info">
        <h4>
          {rental.category} in {rental.city}
        </h4>
        <p>From ${rental.dailyPrice}</p>
        <Link to={`/rentals/${rental._id}`} className="rental-link">
          Details
        </Link>
        {renderButton && renderButton()}
      </div>
      {/* <div className="tour-info">
          <p className={`sub-info type-${rental.category}`}>
            {rental.shared ? 'Shared ' : 'Whole '}
            {rental.category} &#183; {rental.city}{' '}
          </p>
          <div className="tour-title">
            <h4>{rental.title}</h4>
          </div>
          <p>{rental.description}</p>
          <div className="tour-footer">
            <p>${rental.dailyPrice} per Night &#183; Free Cancelation</p>
          </div>
        </div> */}
    </article>
  );
};

export default RentalCard;
