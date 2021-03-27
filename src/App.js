import React from 'react';
import  {BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import FeedInfoList from "./components/feedInfo-list.component";
import EditFeedInfo from "./components/edit-FeedInfo.component";
import CreateFeedInfo from "./components/create-FeedInfo.component";
import CreateUser from "./components/create-user.component";
function App(){

return(
  <Router>
    <div className="container">
    <Navbar/>
    <br/>
  <Route path="/" exact component={FeedInfoList} />
  <Route path="/edit/:id" exact component={EditFeedInfo} />
  <Route path="/create" exact component={CreateFeedInfo} />
  <Route path="/user" exact component={CreateUser} />
  </div>
  </Router>
)

}

export default App;














/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

*/
