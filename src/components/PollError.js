import React from "react";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";

const PollError = ({ location }) => (
  <Jumbotron>
    <h1>Question not found</h1>
    <p>The question you're looking does not exist or have been deleted.</p>
    <p>
      <Button variant="primary" href="/">Go to Homepage</Button>
    </p>
  </Jumbotron>
);

export default PollError;
