//  @ Extract API Errors
import axiosService from 'services/AxiosService';
const { bpvAxios } = axiosService;

export const extractApiErrors = (responseError) => {
  let errors = [{ title: 'Error!', detail: 'Ooops, something went wrong!' }];

  if (responseError && responseError.data && responseError.data.errors) {
    errors = responseError.data.errors;
  }
  return errors;
};

export const deleteResource = ({ url, resource }) => (dispatch) => {
  return bpvAxios
    .delete(url)
    .then((res) => res.data)
    .then(({ id }) => {
      dispatch({
        type: 'DELETE_RESOURCE',
        id,
        resource
      });
    })
    .catch((error) => {
      dispatch({
        type: 'REQUEST_ERROR',
        errors: extractApiErrors(error.response || []),
        resource
      });
    });
};

export const uploadImage = (image) => {
  const formData = new FormData();
  formData.append('image', image);
  return bpvAxios.post('/image-upload', formData).then((res) => res.data);
};

export * from './auth';
export * from './rental';
export * from './bookings';
