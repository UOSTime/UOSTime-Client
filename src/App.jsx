import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './scss/index.scss';
import { RecoilRoot } from 'recoil';
import { CssBaseline } from '@material-ui/core';
import Footer from './components/Footer';

import Timetable from './views/Timetable';
import Login from './views/login/index';
import PrivacyPolicy from './views/PrivacyPolicy';
import Admin from './views/admin';

function ErrorPage() {
  return <h1>404 Not Found</h1>;
}

function App() {
  return (
    <div className="background-container">
      <CssBaseline>
        <RecoilRoot>
          <div className="main-container">
            <Router>
              <Switch>
                <Route exact path="/" component={Timetable} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/admin" component={Admin} />
                <Route path="/privacy_policy" component={PrivacyPolicy} />
                <Route path="*" component={ErrorPage} />
              </Switch>
            </Router>
          </div>
          <Footer />
        </RecoilRoot>
      </CssBaseline>
    </div>
  );
}

export default App;
