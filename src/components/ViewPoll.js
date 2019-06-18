import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";

class ViewPoll extends Component {
  state = {
    selectedOption: ""
  };
  onClick(e, question) {
    e.preventDefault();
    const option = this.state.selectedOption;
    question[option].votes.push(this.props.authedUser);
    this.props.history.push(`/poll/results/${this.props.match.params.id}`);
  }
  toggleCheckboxValue(e) {
    this.setState({
      selectedOption: e.target.value
    });
  }
  render() {
    const question = this.props.questions[this.props.match.params.id];
    const { author, timestamp, optionOne, optionTwo } = this.props.questions[
      this.props.match.params.id
    ];

    console.group("questões");
    console.log("the question", question);
    console.log("the author", author);
    console.log("the timestamp", timestamp);
    console.log("option one", optionOne);
    console.log("option two", optionTwo);
    console.groupEnd();
    return (
      <div className="question">
        <Card style={{ width: "100%" }}>
          <Card.Header>
            <img
              src={this.props.users[author].avatarURL}
              alt={`Avatar of ${author}`}
              className="avatar"
            />
            <span>On {formatDate(timestamp)} </span>
            <span>{author} asked:</span>
          </Card.Header>
          <Card.Body>
            <Card.Title>Would you rather</Card.Title>
            <Card.Text>
              <label>
                <input
                  type="radio"
                  value="optionOne"
                  name="options"
                  onChange={e => this.toggleCheckboxValue(e)}
                />{" "}
                {optionOne.text}
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  value="optionTwo"
                  name="options"
                  onChange={e => this.toggleCheckboxValue(e)}
                />{" "}
                {optionTwo.text}{" "}
              </label>
            </Card.Text>
            <Button variant="primary" onClick={e => this.onClick(e, question)}>
              Submit
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
function mapStateToProps({ authedUser, users, questions }) {
  return {
    authedUser,
    questions,
    users
  };
}

export default withRouter(connect(mapStateToProps)(ViewPoll));
