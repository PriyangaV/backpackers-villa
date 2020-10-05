import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AuthProvider, useAuth } from 'providers/AuthProvider';
import { MapProvider } from 'providers/MapProvider';
import { initStore } from 'store';
import { Header } from 'components';
import Routes from 'Routes';
import { ToastContainer } from 'react-toastify';
// import Slider from './Slider';
// import NewNavbar from './NewNavbar';
// import HeaderNew from './HeaderNew';

const store = initStore();
const MAP_API_KEY = 'n8HXl1UVlgJl2TXC8YHKchDc6x0hcTsL';

const Providers = ({ children }) => (
  <Provider store={store}>
    <AuthProvider>
      <MapProvider apiKey={MAP_API_KEY}>{children}</MapProvider>
    </AuthProvider>
  </Provider>
);

const BpvApp = () => {
  const authService = useAuth();
  useEffect(() => {
    authService.checkAuthState();
  }, [authService]);
  return (
    <Router>
      <Header logout={authService.signOut} />
      {/* <HeaderNew /> */}
      {/* <NewNavbar /> */}
      <Routes />
    </Router>
  );
};

const App = () => {
  return (
    <Providers>
      {/* <Slider /> */}
      <ToastContainer />
      <BpvApp />
    </Providers>
  );
};

export default App;
