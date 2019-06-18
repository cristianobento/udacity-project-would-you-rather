import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQuestionUser, formatDate } from "../utils/helpers";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { withRouter } from "react-router-dom";

class Question extends Component {
  onClick(e, id, status) {
    e.preventDefault();
    if (status === "answered") {
      this.props.history.push(`/poll/results/${id}`);
    } else if (status === "unanswered") {
      this.props.history.push(`/poll/${id}`);
    }
  }
  render() {
    const { question } = this.props;
    const { name, avatar, timestamp, optionOne, optionTwo, id } = question;
    return (
      <div className="question">
        <Card style={{ width: "100%" }}>
          <Card.Header>
            <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
            <span>On {formatDate(timestamp)} </span>
            <span>{name} asked:</span>
          </Card.Header>
          <Card.Body>
            <Card.Title>Would you rather</Card.Title>
            <Card.Text>
              {optionOne.text} <span className="text-danger">OR</span>{" "}
              {optionTwo.text}
              {`?`}
            </Card.Text>
            <Button
              variant="primary"
              onClick={e => this.onClick(e, id, this.props.status)}
            >
              Answer this question
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { status, id }) {
  const question = questions[id];
  return {
    authedUser,
    question: question
      ? formatQuestionUser(question, users[question.author], authedUser)
      : null
  };
}

export default withRouter(connect(mapStateToProps)(Question));
