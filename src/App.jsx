import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getToken } from '@utils/api';
import './scss/main.scss';
import Footer from './components/Footer';

import Timetable from './views/timetable';
import Login, { LoginBox } from './views/login/index';
import PrivacyPolicy from './views/terms/PrivacyPolicy';
import TermsOfService from './views/terms/TermsOfService';
import Admin from './views/admin';
import EmailAuth from './views/EmailAuth';
import usePopup from './components/usePopup';
import Notice from './views/notice';

function ErrorPage() {
  return <h1>404 Not Found</h1>;
}

function App() {
  const [Popup] = usePopup();
  const token = getToken();
  const NeedLogin = token ? null : LoginBox;

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={NeedLogin || Timetable} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/notice" component={NeedLogin || Notice} />
          <Route exact path="/admin" component={NeedLogin || Admin} />
          <Route path="/privacy_policy" component={PrivacyPolicy} />
          <Route path="/terms_of_service" component={TermsOfService} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </Router>
      <Footer />
      <Popup />
    </>
  );
}

export default App;
