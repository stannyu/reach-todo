import React from 'react';
import { Link } from 'react-router-dom';
import './404.scss';

const NotFoundPageComponent = () => {
  return (
    <div>
      <Link to="/">Nav to 🏡</Link>
      <h1 className="not_found_title">404 page</h1>
    </div>
  );
};

export { NotFoundPageComponent };
