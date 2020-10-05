/* import React from 'react';
import { StateContext } from '../context/state';

const connect = (Component, mapStateToProps) => {
  class Connect extends React.Component {
    render() {
      //const { store } = this.context;
      //return <Component store={store} />;

      const slice = mapStateToProps(this.context);
      return <Component {...slice} />;
    }
  }
  Connect.contextType = StateContext;
  return Connect;
};
export default connect;
*/

import React from 'react';
// //import { StateContext } from '../context/state';
import { StateContext } from './Provider';

const connect = (selectState) => (Component) => {
  class Connect extends React.Component {
    constructor(props, context) {
      super(props);

      this.state = {
        slice: selectState(context.getState())
      };

      this.unsubscribe = context.subscribe(() =>
        this.handleStateChange(context)
      );
    }

    handleStateChange = (context) => {
      const rootState = context.getState(); // - Re-render component
      this.setState({ slice: selectState(rootState) });
    };

    // componentWillMount() {
    //   this.unsubscribe();
    // }

    render() {
      /* const { getState, dispatch } = this.context;
      const state = getState();
      const slice = selectState(state); */

      const { dispatch } = this.context;
      const { slice } = this.state;
      return <Component {...slice} dispatch={dispatch} />;
    }
  }
  Connect.contextType = StateContext;
  return Connect;
};

export default connect;
