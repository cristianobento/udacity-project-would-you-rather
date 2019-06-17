import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import PropTypes from "prop-types";
import { getUsers } from "../utils/api";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      errors: {},
      isLoading: false,
      users: [],
      redirectToReferrer: false
    };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  componentDidMount() {
    getUsers().then(users => {
      this.setState({
        users: Object.keys(users["users"])
      });
    });
  }

  onClick(e) {
    e.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    if (this.state.id !== "" && this.state.id !== "select user...") {
      this.props.setAuthedUser(this.state.id);
      this.setState({ redirectToReferrer: true });
    } else {
      this.props.history.push("/login");
    }
  }
  onHandleChange(e) {
    this.setState({ id: e.target.value });
  }
  render() {
    let defaultUserValue = [<option key="default">select user...</option>];
    let optionUsers = this.state.users.map(user => (
      <option key={user}>{user}</option>
    ));
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer === true && { from }.pathname !== "/login") {
      return <Redirect to={from} />;
    }
    return (
      <Card className="text-center">
        <Card.Header>Would you rather game </Card.Header>
        <Card.Body>
          <Card.Title>Login to start playing</Card.Title>
          <Card.Text>Who are you?</Card.Text>
          <select onChange={this.onHandleChange}>
            {defaultUserValue.concat(optionUsers)}
          </select>
          <hr />
          <Button variant="primary" onClick={this.onClick}>
            Login
          </Button>
        </Card.Body>
        <Card.Footer className="text-muted"></Card.Footer>
      </Card>
    );
  }
}
Login.propTypes = {
  setAuthedUser: PropTypes.func.isRequired
};

Login.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(
  null,
  { setAuthedUser }
)(Login);
