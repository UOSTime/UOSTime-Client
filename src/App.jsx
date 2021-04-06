import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './scss/index.scss';
import { RecoilRoot } from 'recoil';
import { CssBaseline } from '@material-ui/core';
import Footer from './components/Footer';

import Timetable from './views/Timetable';
import Login from './views/Login';
import PrivacyPolicy from './views/PrivacyPolicy';
import Admin from './views/admin';

{/* ToDo : 모달 만들어서 연계, 개인정보처리방침 따로 빼기, 모바일 대응*/ }

function ErrorPage() {
  return <h1>404 Not Found</h1>;
}

function App() {
  return (
    <div className="background-container">
      <CssBaseline>
        <RecoilRoot>
          <div className="main-container">
            <div className="main-content">
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
            <Footer className="footer" />
          </div>
        </RecoilRoot>
      </CssBaseline>
    </div>
  );
}

export default App;
