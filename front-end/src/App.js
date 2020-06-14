import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddVideo from "./components/add-video";
import Video from "./components/video";
import VideosList from "./components/videos-list";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-primary">
            <a href="/videos" className="navbar-brand">
              Online-playlist
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/videos"} className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add Video
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/videos"]} component={VideosList} />
              <Route exact path="/add" component={AddVideo} />
              <Route path="/videos/:id" component={Video} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;