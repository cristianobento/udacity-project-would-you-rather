import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Leader extends Component {
  calcAnsweredQuestions(user) {
    let sumAnswered = 0;
    let sumCreated = 0;
    Object.values(this.props.questions).map(question => {
      if (question.author === user.id) {
        sumCreated += 1;
      }
      const votesTotal = question.optionOne.votes.concat(
        question.optionTwo.votes
      );
      for (let vote in votesTotal) {
        if (votesTotal[vote] === user.id) {
          sumAnswered += 1;
        }
      }
      return null;
    });
    return { sumAnswered: sumAnswered, sumCreated: sumCreated };
  }
  render() {
    const answeredQ = this.calcAnsweredQuestions(this.props.user).sumAnswered;
    const createdQ = this.calcAnsweredQuestions(this.props.user).sumCreated;
    return (
      <div className="question">
        <img
          src={this.props.user.avatarURL}
          alt={`Avatar of ${this.props.user.author}`}
          className="avatar"
        />
        <div className="question-info">
          <h3>{this.props.user.author}</h3>
          Answered questions: {answeredQ}
          <br />
          Created questions: {createdQ}
        </div>
        <hr />
        Score: {answeredQ + createdQ}
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

export default withRouter(connect(mapStateToProps)(Leader));
