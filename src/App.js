import React from 'react';
import { Router, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
import Main from './components/Main';
import Kids from './components/Kids';
import KidsEdit from './components/KidsEdit';
import './App.css';

const history= createHashHistory();

const App = (props) => (
  <Router history={history}>
    <div>
      <Route exact path="/" component={Main}/>
      <Route exact path="/kids" component={Kids}/>
      <Route exact path="/kids/:id" component={KidsEdit}/>
    </div>
  </Router>
);

export default App;
