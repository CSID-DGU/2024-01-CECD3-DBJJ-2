import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>DBJJ</h2>
        <nav>
          <Link to="/">Main</Link>
          <Link to="/data-upload">Data Upload</Link>
          <Link to="/dataset">Dataset</Link>
          <Link to="/detection">Detection</Link>
          <Link to="/reports">Reports</Link>
        </nav>
      </aside>
      <div className="main-content">
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
