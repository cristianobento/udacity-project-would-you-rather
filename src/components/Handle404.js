import React from 'react';

const Handle404 = ({ location }) => (
    <div>
       <h2>No match found for <code>{location.pathname}</code></h2>
    </div>
 );

 export default Handle404