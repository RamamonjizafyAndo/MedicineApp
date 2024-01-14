import React, { useState } from "react";
import { Link } from 'react-router-dom';
import ListeMedic from "./liste";
import SearchMedic from "./search";
import { ipcRenderer } from "electron";

function Medic() {
    const [search, setSearch] = useState('')
    const [data, setData] = useState([]);
    const [isSearch, setIsSearch] = useState(false)
    const onChangeSearch = (e)=>{
        setSearch(e.target.value);
        if(e.target.value == ''){
            setIsSearch(false)
        }
    }
    const onSubmitSearch = (e)=>{
        e.preventDefault();
        ipcRenderer.send('searchData', "Medicaments", [{column:'nomMed', value:search},{column:'qtMed', value:search}, {column:'prixMed', value: search}]);
        ipcRenderer.on('searchDataResponse', (event, results) => {
            setData(results)            
        });
        setIsSearch(true);
    }
    return (<>
        <p className="text-center title">Medicament</p>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className="navbar-brand">
                    <button className="btn btn-outline-primary">
                    <Link
              to='/medic/addMedic'
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
                    <form className="d-flex" role="search" onSubmit={onSubmitSearch}>
                        <input className="form-control me-2" type="search" placeholder="Recherche" aria-label="Recherche" value={search} onChange={onChangeSearch} />
                            <button className="btn btn-outline-success" type="submit">Recherche</button>
                    </form>
                </div>
            </div>
        </nav>
        <div className="container-fluid">
            {!isSearch ? <ListeMedic /> : <SearchMedic data={data}/>}
            
        </div>
    </>)
}

export default Medic;