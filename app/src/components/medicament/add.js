import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
const { ipcRenderer } = require('electron');

function AddMedic() {
    const navigate = useNavigate();
    const [nom, setNom] = useState('');
    const [qt, setQt] = useState('');
    const [prix, setPrix] = useState('');
    const [validNameMed, setValidNameMed] = useState(true);
    const [addStatus, setAddStatus] = useState(false)
    useEffect(() => {
        const addMed = (event, response) => {
            console.log(response[0]);
            if (response.find((value)=>value.medStatus=='true')) {
                setValidNameMed(false)
            } else {
                if((nom && qt && prix) !== ""){
                    ipcRenderer.send('insert-medicament', { value1: nom, value2: qt, value3: prix });
                    navigate('/medic');
                }
            }
        }

        ipcRenderer.on('select-data-reply', addMed);
        return ()=>{
            ipcRenderer.removeListener('select-data-reply', addMed);
        }
    }, [nom, qt, prix])
    const onChangeLabel = (e) => {
        setNom(e.target.value)
        setValidNameMed(true);
    }
    const onChangeQt = (e) => {
        setQt(e.target.value);
    }
    const onChangePrix = (e) => {
        setPrix(e.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault();
        setNom(nom.toLowerCase())
        ipcRenderer.send('select-data', "SELECT nomMed, CASE WHEN LOWER(nomMed) = ? THEN 'true' ELSE 'false' END AS medStatus FROM Medicaments", [nom]);
    }
    return (
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
                                <input type="text" style={{ color: !validNameMed ? 'red' : 'black' }} value={nom} onChange={onChangeLabel} className="form-control" id="nomMed" aria-describedby="nomMed" />
                                {
                                    !validNameMed && 
                                    <div style={{ color: 'red' }}>
                                        Medicament déja existé
                                    </div>
                                }
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