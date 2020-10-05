import React from 'react';
import { FaBed, FaUsers, FaChild, FaHotel, FaCompress } from 'react-icons/fa';

const RentalInfo = ({ rental }) => {
  const { description } = rental;
  return (
    <article className="room">
      <h3>Room Details</h3>
      <div className="bed-details">
        <div>
          <FaHotel />
          {rental.numOfRooms} rooms
        </div>
        <div>
          <FaUsers />
          {rental.numOfRooms + 4} Adults
        </div>

        <div>
          <FaChild />
          {rental.numOfRooms - 1} Children
        </div>
        <div>
          <FaBed />
          {rental.numOfRooms + 4} beds
        </div>
        <div>
          <FaCompress />
          18m2
        </div>
      </div>
      <p className="description">{description}</p>
    </article>
  );
};

export default RentalInfo;

// import React from 'react';
// import { capitalize } from 'helpers/functions';
// import { Assets } from 'components';

// const RentalInfo = ({ rental }) => {
//   const {
//     title,
//     category,
//     city,
//     dailyPrice: price,
//     description,
//     numOfRooms,
//     shared
//   } = rental;
//   return (
//     <article>
//       <p className={`sub-info type-${category}`}>
//         {shared ? 'Shared ' : 'Whole '}
//         {category}
//       </p>
//       {rental.owner && (
//         <div className="rental-owner">
//           <img
//             src="https://api.adorable.io/avatars/285/abott@adorable.png"
//             alt={rental.owner.email}
//           />
//           <span>{rental.owner.username}</span>
//         </div>
//       )}
//       <h1>{title}</h1>
//       <p className="city">{capitalize(city)}</p>
//       <p className="price">${price} per Night</p>
//       <div className="bed-details">
//         <span>{numOfRooms} bedrooms</span> <span>{numOfRooms + 4} guests</span>
//         <span>{numOfRooms + 2} beds</span>
//       </div>
//       <p className="description">{description}</p>
//       <hr />
//       <Assets />
//     </article>
//   );
// };

// export default RentalInfo;
