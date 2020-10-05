import axiosService from 'services/AxiosService';
import { deleteResource, extractApiErrors } from './index';

const { bpvAxios } = axiosService;

export const verifyRentalOwner = (rentalId) => {
  return bpvAxios.get(`/rentals/${rentalId}/verify-user`);
};

export const fetchRentals = (location) => async (dispatch) => {
  dispatch({ type: 'REQUEST_DATA', resource: 'rentals' });
  const query = location ? `/rentals?city=${location}` : '/rentals';
  const { data } = await bpvAxios.get(query);
  dispatch({
    type: 'REQUEST_DATA_COMPLETE',
    resource: 'rentals'
  });
  dispatch({
    type: 'FETCH_RENTALS',
    rentals: data
  });
};

export const fetchUserRentals = () => async (dispatch) => {
  dispatch({ type: 'REQUEST_DATA', resource: 'manage-rentals' });
  return bpvAxios
    .get('/rentals/me')
    .then((res) => {
      return res.data;
    })
    .then((rentals) => {
      dispatch({
        type: 'REQUEST_DATA_COMPLETE',
        data: rentals,
        resource: 'manage-rentals'
      });
    });
};

export const fetchRentalById = (id) => async (dispatch) => {
  dispatch({ type: 'REQUEST_DATA', resource: 'rental' });
  const { data } = await bpvAxios.get(`/rentals/${id}`);
  dispatch({
    type: 'REQUEST_DATA_COMPLETE',
    resource: 'rental'
  });
  dispatch({
    type: 'FETCH_RENTAL_BY_ID',
    rental: data
  });
};

export const createRental = (rental) => {
  /*
  const token = localStorage.getItem('bpv_token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }; */

  // return bpvAxios.post('/api/v1/rentals', rental, config);
  return bpvAxios.post('/rentals', rental);
};

/* export const deleteRental = (rentalId) => (dispatch) => {
  return bpvAxios
    .delete(`/rentals/${rentalId}`)
    .then((res) => res.data)
    .then(({ id }) => {
      dispatch({
        type: 'DELETE_RESOURCE',
        id,
        resource: 'manage-rentals'
      });
    })
    .catch((error) => {
      dispatch({
        type: 'REQUEST_ERROR',
        errors: extractApiErrors(error.response || []),
        resource: 'manage-rentals'
      });
    });
}; */

export const deleteRental = (rentalId) => (dispatch) => {
  const url = `/rentals/${rentalId}`;
  return dispatch(deleteResource({ url, resource: 'manage-rentals' }));
};

export const updateRental = (rentalId, rentalData) => (dispatch) => {
  return bpvAxios
    .patch(`/rentals/${rentalId}`, rentalData)
    .then((res) => res.data)
    .then((updatedRental) => {
      dispatch({
        type: 'UPDATE_RENTAL_SUCCESS',
        rental: updatedRental
      });
    })
    .catch((error) => Promise.reject(extractApiErrors(error.response || [])));
};
