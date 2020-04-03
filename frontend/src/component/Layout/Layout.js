import React from 'react';
import './Layout.css';

const Layout = props => {
  return (
    <div className="Layout">
      <div className="Header">

      </div>
      {props.children}
    </div>
  );
};

export default Layout;