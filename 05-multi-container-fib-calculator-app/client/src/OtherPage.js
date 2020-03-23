import React from 'react';
import {Link} from 'react-router-dom';
import logo from "./logo.svg";


export default () => {
    return (
      <div>
        In some other page!
        <Link to="/"> Go Back Home!</Link>
      </div>
    );
};