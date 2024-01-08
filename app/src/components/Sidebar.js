import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar({ children }) {
  return (
    <>
      <div style={{ display: 'flex' }}>
        {/* Navbar */}


        {/* Sidebar */}
        <ul
          className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
          id="accordionSidebar"
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            height: '100vh',
            width: '250px',
            zIndex: '1000',
          }}
        >
          <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa-laugh-wink" />
            </div>
            <div className="sidebar-brand-text mx-3">RASALAMA MARTIORA</div>
          </a>
          <hr className="sidebar-divider my-0" />
          <li className="nav-item">
            <NavLink
              to={'/'}
              className="nav-link"
              activeClassName="active-link"
              exact
            >
              <i class="bi bi-kanban"></i>{' '}
              <span>Dashboard</span> 
            </NavLink>

          </li>
          <hr className="sidebar-divider" />
          <div className="sidebar-heading">Gestion</div>
          <li className="nav-item">
            <NavLink
              to={'/patient'}
              className="nav-link"
              activeClassName="active-link"
              exact
            >
              <i className="bi bi-file-person"></i>{' '}
              <span>Patients</span>
            </NavLink>

          </li>
          <li className="nav-item">
            <NavLink
              to={'/medic'}
              className="nav-link"
              activeClassName="active-link"
              exact
            >
              <i class="bi bi-capsule"></i>{' '}
              <span>Médicaments</span>
            </NavLink>

          </li>
          <hr className="sidebar-divider" />
          <div className="sidebar-heading">Facturation</div>
          <li className="nav-item">
            <NavLink
              to={'/fact'}
              className="nav-link"
              activeClassName="active-link"
              exact
            >
              <i class="bi bi-file-earmark-medical-fill"></i>{' '}
              <span>Ordonnance</span>
            </NavLink>

          </li>
        </ul>

        {/* Contenu principal */}
        <div style={{ marginLeft: '250px', flex: '1', padding: '20px' }}>
          {children}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
