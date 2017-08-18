import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router,browserHistory } from 'react-router-dom'
import App from './app'
import '../css/bootstrap.css'
import '../css/app.less'

ReactDOM.render(
  <Router  history={ browserHistory }>
      <App />
    </Router>,
  document.getElementById('container')
);
