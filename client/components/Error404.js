import React from 'react';

const Error404 = () => {
  return (
    <React.Fragment>
      <h2>404</h2>
      <h1>Error: Pogo not found</h1>
      {/* automatically fetches from public folder*/}
      <img width="400" src="404image.jpg" />
    </React.Fragment>
  );
};

export default Error404;
