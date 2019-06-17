import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class ViewPollResults extends Component {
  render() {
    const { author, optionOne, optionTwo } = this.props.questions[
      this.props.match.params.id
    ];
    const optionOneLenght = optionOne.votes.length;
    const optionTwoLenght = optionTwo.votes.length;
    const now1 = (100 * optionOneLenght) / (optionOneLenght + optionTwoLenght);
    const now2 = (100 * optionTwoLenght) / (optionOneLenght + optionTwoLenght);
    const progressBarOptionOne = (
      <ProgressBar variant="info" now={now1} label={`${now1}%`} />
    );
    const progressBarOptionTwo = (
      <ProgressBar variant="info" now={now2} label={`${now2}%`} />
    );
    return (
      <div className="question">
        <img
          src={this.props.users[author].avatarURL}
          alt={`Avatar of ${author}`}
          className="avatar"
        />
        <div className="question-info">
          <span>Asked by {author}</span>
          <h3>Results</h3>
          <Card bg="light" style={{ width: "18rem" }}>
            <Card.Header>Would you rather</Card.Header>
            <Card.Body>
              <Card.Title>{optionOne.text}</Card.Title>
              {progressBarOptionOne}
            </Card.Body>
          </Card>
          <br />
          <Card bg="light" style={{ width: "18rem" }}>
            <Card.Header>Would you rather</Card.Header>
            <Card.Body>
              <Card.Title>{optionTwo.text}</Card.Title>
              {progressBarOptionTwo}
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ users, questions }) {
  return {
    questions,
    users
  };
}

export default withRouter(connect(mapStateToProps)(ViewPollResults));
