import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { CssBaseline } from '@material-ui/core';

import Timetable from './views/Timetable';
import Login from './views/Login';
import PrivacyPolicy from './views/PrivacyPolicy';
import Admin from './views/admin';

function ErrorPage() {
  return <h1>404 Not Found</h1>;
}

function App() {
  return (
    <CssBaseline>
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
    </CssBaseline>
  );
}

export default App;
