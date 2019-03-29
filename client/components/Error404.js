import React from 'react';

const Error404 = () => {
  return (
    <div className="container flex column">
      <h2>404</h2>
      <h1>Error: Pogo not found</h1>
      {/* automatically fetches from public folder*/}
      <img style={{width: 'auto'}} src="/404image.jpg" />
    </div>
  );
};

export default Error404;
