import React, { createContext, useContext } from 'react';
import { loginUser, userAuthenticated } from 'actions';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import moment from 'moment';

export const AuthContext = createContext(null);

// export const AuthProvider = connect()(({ children, dispatch }) => {
const AuthBaseProvider = ({ children, dispatch }) => {
  const checkAuthState = () => {
    // > moment() - currentTime < tokenExpireTime
    // > 17.00 < 18.30 - valid
    // > 17.00 < 16.30 - not valid (Expired)

    if (getToken() && moment().isBefore(getExpiration(getDecodedToken())))
      dispatch(userAuthenticated(getDecodedToken()));
  };

  const getToken = () => localStorage.getItem('bpv_token');

  const decodeToken = (token) => jwt.decode(token);

  const getDecodedToken = () => decodeToken(getToken());

  // - decodedToken.exp
  const getExpiration = ({ exp }) => moment.unix(exp);

  const isTokenValid = (decodedToken) =>
    decodedToken && moment().isBefore(getExpiration(decodedToken));

  const isAuthenticated = () => isTokenValid(getDecodedToken());

  const signOut = () => {
    localStorage.removeItem('bpv_token');
    dispatch({ type: 'USER_SIGNED_OUT' });
  };

  const signIn = (loginData) =>
    loginUser(loginData).then(({ token }) => {
      localStorage.setItem('bpv_token', token);
      const decodedToken = decodeToken(token);
      dispatch({
        type: 'USER_AUTHENTICATED',
        username: decodedToken.username || ''
      });

      return token;
    });

  const authApi = {
    signIn,
    checkAuthState,
    signOut,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={authApi}>{children}</AuthContext.Provider>
  );
};
// });

export const AuthProvider = connect()(AuthBaseProvider);

// @ Works only with functional component
export const useAuth = () => {
  return useContext(AuthContext);
};

// @ HOC for class components
export const withAuth = (Component) => (props) => (
  <AuthContext.Consumer>
    {(authApi) => <Component {...props} auth={authApi} />}
  </AuthContext.Consumer>
);
