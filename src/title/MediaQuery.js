import React from 'react';
import BaseMediaQuery from 'react-responsive';

import Breakpoints from './Breakpoints';

const { Provider, Consumer } = React.createContext({ width: Breakpoints.Small.max });

// Wrapper for react-responsive component. Uses react context to support easy server-side rendering.
// Provider should be used on server side to add desired values for media queries.
// Consumer wraps react-responsive MediaQuery and passes the values from provider to it.
const MediaQuery = props => (
  <Consumer>
    {value => <BaseMediaQuery values={value} {...props} />}
  </Consumer>
);

export { Provider as MediaQueryProvider, MediaQuery };
