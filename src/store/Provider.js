import React, { createContext } from 'react';

export const StateContext = createContext({});
const Provider = ({ children, store }) => (
  <StateContext.Provider value={store}>{children}</StateContext.Provider>
);

export default Provider;
