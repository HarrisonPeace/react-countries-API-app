import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="not-found">
      <h2>Page Not Found</h2>
      <p>Sorry! We couldn't find the page you're looking for.</p>
      <Link className="button" to='/'>Return Home</Link>
    </main>
  );
};

export default NotFound;
