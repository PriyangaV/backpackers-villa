import axiosService from 'services/AxiosService';
import { extractApiErrors, deleteResource } from './index';
const { bpvAxios } = axiosService;

export const createBooking = (booking) => {
  return bpvAxios
    .post('/bookings', booking)
    .then((res) => res.data)
    .catch((err) => Promise.reject(extractApiErrors(err.response || {})));
};

export const getBookings = (rentalId) => {
  return bpvAxios.get(`/bookings?rental=${rentalId}`).then((res) => res.data);
};

export const fetchUserBookings = () => async (dispatch) => {
  dispatch({ type: 'REQUEST_DATA', resource: 'manage-bookings' });
  return bpvAxios
    .get('/bookings/me')
    .then((res) => {
      return res.data;
    })
    .then((bookings) => {
      dispatch({
        type: 'REQUEST_DATA_COMPLETE',
        data: bookings,
        resource: 'manage-bookings'
      });
    });
};

export const fetchReceivedBookings = () => async (dispatch) => {
  dispatch({ type: 'REQUEST_DATA', resource: 'received-bookings' });
  return bpvAxios
    .get('/bookings/received')
    .then((res) => {
      return res.data;
    })
    .then((receivedBookings) => {
      dispatch({
        type: 'REQUEST_DATA_COMPLETE',
        data: receivedBookings,
        resource: 'received-bookings'
      });
    });
};

/* export const deleteBooking = (bookingId) => (dispatch) => {
  return bpvAxios
    .delete(`/bookings/${bookingId}`)
    .then((res) => res.data)
    .then(({ id }) => {
      dispatch({
        type: 'DELETE_RESOURCE',
        id,
        resource: 'manage-bookings'
      });
    })
    .catch((error) => {
      dispatch({
        type: 'REQUEST_ERROR',
        errors: extractApiErrors(error.response || []),
        resource: 'manage-bookings'
      });
    });
}; */

export const deleteBooking = (bookingId) => (dispatch) => {
  const url = `/bookings/${bookingId}`;
  return dispatch(deleteResource({ url, resource: 'manage-bookings' }));
};
