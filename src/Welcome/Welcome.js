import React, { Component } from 'react';
import './Welcome.css';
import { Link } from 'react-router-dom';

class Welcome extends Component {
  render() {
    return (
      <div className="Welcome">
        <div id="welcomeText">
          <p>
              Welcome to the dinner planner React Startup code!
          </p>
          <Link to="/search">
            <button className="btn btn-warning">Start planning</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Welcome;
