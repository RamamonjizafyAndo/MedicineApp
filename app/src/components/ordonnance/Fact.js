import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
function Fact() {
    return (
        <>
            <p className="text-center">Les Ordonnances</p>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <div className="navbar-brand">
                        <button className="btn btn-outline-primary">
                            <Link
                                to='/fact/addOrd'
                                className="nav-link"
                                activeClassName="active-link"
                                exact
                            >
                                <i className="bi bi-person-plus-fill"></i>{' '}
                                <span>Ajouter</span>
                            </Link>
                        </button>
                    </div>
                    <div className="navbar-toggle basic-navbar-nav"></div>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo02">
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Recherche" aria-label="Recherche" />
                            <button className="btn btn-outline-success" type="submit">Recherche</button>
                        </form>
                    </div>
                </div>
            </nav>
            <div className="container-fluid">

            </div>
        </>
    )
}

export default Fact;