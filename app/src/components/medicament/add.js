import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
const { ipcRenderer } = require('electron');

function AddMedic(){
    const navigate = useNavigate();
    const [nom, setNom] = useState('');
    const [qt, setQt] = useState('');
    const [prix, setPrix] = useState('');
    const onChangeLabel = (e)=>{
        setNom(e.target.value)
    }
    const onChangeQt = (e)=>{
        setQt(e.target.value);
    }
    const onChangePrix = (e)=>{
        setPrix(e.target.value)
    }
    const onSubmit = (e)=>{
        e.preventDefault();
        ipcRenderer.send('insert-medicament',{value1: nom, value2: qt, value3: prix});
        navigate('/medic')
    }
    return(
    <>
    <p className="text-center title">
                Ajout patient
            </p>
            <div className="container-fluid" >
                <div className="card card-add">
                    <div className="card-body">
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label for="nomMed" className="form-label">Désignation</label>
                                <input type="text" value={nom} onChange={onChangeLabel} className="form-control" id="nomMed" aria-describedby="nomMed" />
                            </div>
                            <div className="mb-3">
                                <label for="qt" className="form-label">Quantité</label>
                                <input type="number" value={qt} onChange={onChangeQt} className="form-control" id="qt " />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" for='prix'>Prix</label>
                                <input type="number" value={prix} onChange={onChangePrix} className="form-control" id="prix " />
                            </div>
                            <button type="submit" className="btn btn-primary"><i className="bi bi-database-fill-add"></i>{' '}Ajouter</button>
                        </form>
                    </div>
                </div>
            </div>
    </>)
};

export default AddMedic;