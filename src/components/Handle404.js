import React from "react";

const Handle404 = ({ location }) => (
  <div>
    <h1>
      No match found for <code>{location.pathname}</code>
    </h1>
  </div>
);

export default Handle404;
