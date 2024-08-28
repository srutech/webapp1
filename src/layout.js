// src/layout.js
import React from 'react';

export function Navbar({ onMenuClick }) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Home
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Continuous Monitoring</a></li>
                <li><a className="dropdown-item" href="#">Continuous Auditing</a></li>
                <li>
                  <a className="dropdown-item" href="#" onClick={() => onMenuClick('entities')}>
                    Entities
                  </a>
                </li>
                <li><a className="dropdown-item" href="#">Search Portal</a></li>
                <li><a className="dropdown-item" href="#">IP (Interested Parties)</a></li>
                <li><a className="dropdown-item" href="#">DR (Desktop Review)</a></li>
                <li><a className="dropdown-item" href="#">UAM (User Access Management)</a></li>
              </ul>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container">
        <span className="text-muted">Place footer content here.</span>
      </div>
    </footer>
  );
}
