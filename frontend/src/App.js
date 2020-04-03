import React from 'react';
import {Route, Switch} from "react-router-dom";

import './App.css'
import Layout from "./components/Layout/Layout";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import ChatPage from "./containers/ChatPage/ChatPage";

const App = () => {
  return (
    <Layout>
      <div className="App">
        <Switch>
          <Route path='/' exact render={() => <h3>Welcome, please login before you enter the chat!</h3>}/>
          <Route path='/register' exact component={Register}/>
          <Route path='/login' exact component={Login}/>
          <Route path='/chat' exact component={ChatPage}/>
        </Switch>
      </div>
    </Layout>
  );
};

export default App;