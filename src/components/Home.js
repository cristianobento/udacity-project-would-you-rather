import React, { Component } from "react";
import { connect } from "react-redux";
import { Tabs, Tab } from "react-bootstrap";
import Question from "./Question";
import { withRouter } from "react-router-dom";

class Home extends Component {
  renderQuestions() {
    let answeredIds = [];
    this.props.questionIds.filter(questionID => {
      let question = this.props.questions[questionID];
      const votesTotal = question.optionOne.votes.concat(
        question.optionTwo.votes
      );
      for (let vote in votesTotal) {
        if (votesTotal[vote] === this.props.authedUser) {
          answeredIds.push(questionID);
        }
      }
      return null;
    });
    let unanswered = this.props.questionIds.filter(
      f => !answeredIds.includes(f)
    );
    return (
      <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
        <Tab eventKey={1} title="Unanswered Questions">
          <ul>
            {unanswered.map(id => (
              <li key={id}>
                <Question status={"unanswered"} id={id} />
              </li>
            ))}
          </ul>
        </Tab>
        <Tab eventKey={2} title="Answered Questions">
          <ul>
            {answeredIds.map(id => (
              <li key={id}>
                <Question status={"answered"} id={id} />
              </li>
            ))}
          </ul>
        </Tab>
      </Tabs>
    );
  }

  render() {
    return <div>{this.renderQuestions()}</div>;
  }
}

function mapStateToProps({ authedUser, questions }) {
  return {
    authedUser,
    questions,
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    )
  };
}

export default withRouter(connect(mapStateToProps)(Home));
