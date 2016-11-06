import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ChatTheme from './styles/base-theme';
import App from './App';

// Note: At the moment injectTapEventPlugin can only be called once. Put it at
// the top level of your application, just before you call ReactDOM.render.
// For more detail visit this issue:
// https://github.com/zilverline/react-tap-event-plugin/issues/47
// try {
  injectTapEventPlugin()
// }
// catch(error) {
//   console.log('Ignoring injectTapEventPlugin error')
// }

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(ChatTheme)}>
      <App />
    </MuiThemeProvider>
  </Provider>,
document.getElementById('app'));
