import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect, withRouter } from "react-router-dom";
import { removeState } from '../actions/authedUser'

class Logout extends Component {
    componentWillMount() {
        this.props.dispatch(removeState());
        localStorage.clear()
      }
    render() {
        return (
            <Redirect to="/login" />
        )
    }

}

export default withRouter(connect()(Logout))