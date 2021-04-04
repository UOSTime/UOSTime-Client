import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import CssBaseline from '@material-ui/core/CssBaseline';

import reportWebVitals from './reportWebVitals';
import Timetable from './views/Timetable';
import Login from './views/Login';
import PrivacyPolicy from './views/PrivacyPolicy';
import Admin from './views/admin';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <RecoilRoot>
      <Router>
        <Switch>
          <Route exact path="/" component={Timetable} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/admin" component={Admin} />
          <Route path="/privacy_policy" component={PrivacyPolicy} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </Router>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

function ErrorPage() {
  return <h1>404 Not Found</h1>;
}
