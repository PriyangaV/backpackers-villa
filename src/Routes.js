import React from 'react';
import {
  // Home,
  Login,
  Register,
  Error,
  // Detail,
  SingleRoom,
  Edit,
  SecretPage,
  Hero,
  About,
  Create,
  Search,
  ManageBookings,
  ManageRentals,
  ReceivedBookings,
  Rooms,
  Footer,
  Featured
} from 'pages';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, GuestRoute } from 'components';

const Routes = () => {
  return (
    <Switch>
      {/* <Route path="/" exact children={<Home />} /> */}
      <Route path="/" exact>
        <Hero />
        <About />
        <Featured />
        <Footer />
        {/* <Home /> */}
      </Route>
      <AuthRoute path="/rentals/manage" exact children={<ManageRentals />} />
      <AuthRoute path="/bookings/manage" exact children={<ManageBookings />} />
      <AuthRoute
        path="/bookings/received"
        exact
        children={<ReceivedBookings />}
      />
      <AuthRoute path="/rentals/create" exact children={<Create />} />
      <Route path="/rentals/:location/homes" exact children={<Search />} />
      <Route path="/rentals/:id" exact children={<SingleRoom />} />
      <AuthRoute path="/rentals/:id/edit" exact children={<Edit />} />
      <AuthRoute path="/secret" exact children={<SecretPage />} />
      <GuestRoute path="/login" exact children={<Login />} />
      <GuestRoute path="/register" exact children={<Register />} />
      <Route path="/rooms" exact children={<Rooms />} />
      <Route path="*" exact children={<Error />} />
    </Switch>
  );
};

export default Routes;
