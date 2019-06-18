import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { connect } from "react-redux";

class NavigationBar extends Component {
  render() {
    return (
      <Navbar expand="lg" bg="light" variant="dark" sticky="top">
        <Nav className="mr-auto">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
          </ul>
          <ul>
            <li>
              <NavLink to="/add">New Question</NavLink>
            </li>
          </ul>
          <ul>
            <li>
              <NavLink to="/leaderboard">Leaderboard</NavLink>
            </li>
          </ul>
        </Nav>
        <Nav className="mr-sm-2">
          {this.props.authedUser !== null ? (
            <div>
              {" "}
              Welcome{" "}
              <div className="badge badge-success">
                {this.props.authedUser}
              </div>{" "}
              <NavLink to="/logout" className="btn btn-outline-danger">
                Logout
              </NavLink>
            </div>
          ) : (
            <div />
          )}
        </Nav>
      </Navbar>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default connect(mapStateToProps)(NavigationBar);
