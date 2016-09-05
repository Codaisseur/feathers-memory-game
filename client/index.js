import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ChatTheme from './styles/base-theme';
import App from './app';

if (module.hot) {
  module.hot.accept();
}

injectTapEventPlugin();

render(
  <MuiThemeProvider muiTheme={getMuiTheme(ChatTheme)}>
    <App />
  </MuiThemeProvider>,
document.getElementById('app'));
