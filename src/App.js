import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "./navBar.css";
import MainPage from "./pages/MainPage";
// import CreatePost from "./pages/CreatePost";
// import Post from "./pages/Post";

const App = () => {
  return (
    <div>
      <div className="navbar">
        {/* <div className="links">
          <input type="checkbox" id="ham-menu"></input>
          <label htmlFor="ham-menu">
            <div className="hide-des">
              <span className="menu-line"></span>
              <span className="menu-line"></span>
              <span className="menu-line"></span>
              <span className="menu-line"></span>
              <span className="menu-line"></span>
              <span className="menu-line"></span>
            </div>
          </label>

          <div className="ham-menu">
            <ul className="centre-text links">
              <a href="/">Employees</a>
              <a href="/createEmployee">New Employee</a>
            </ul>
          </div>
        </div> */}
        <a className="header" href="/">
          Employee Management System
        </a>
      </div>

      <Router>
        <Route path="/" exact render={(props) => <MainPage />} />
        {/* <Route path="/createEmployee" render={(props) => <CreatePost />} /> */}
        {/* <Route path="/EmpDetails/:empId" render={(props) => <Post />} /> */}
      </Router>
    </div>
  );
};

export default App;
