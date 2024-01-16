import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { UserContext } from "../../hooks/contextPatient";
const { ipcRenderer } = require('electron');

function ModifMedic() {
    const { idMedicament } = useContext(UserContext)
    const navigate = useNavigate();
    const [nom, setNom] = useState('');
    const [qt, setQt] = useState('');
    const [prix, setPrix] = useState('');
    const [valid, setValid] = useState(true)
    useEffect(() => {
        if (idMedicament) {
            ipcRenderer.send('select-data', 'SELECT * FROM Medicaments WHERE idMed = ?', [idMedicament]);
        }

        const handleSelectDataReply = (event, response) => {
            setNom(response[0].nomMed);
            setQt(response[0].qtMed);
            setPrix(response[0].prixMed);
        };

        ipcRenderer.on('select-data-reply', handleSelectDataReply);

        // Nettoyage de l'effet
        return () => {
            ipcRenderer.removeListener('select-data-reply', handleSelectDataReply);
        };
    }, [idMedicament]);
    const onChangeLabel = (e) => {
        setNom(e.target.value);
        if (e.target.value === "" || prix <=0 || qt < 0) {
            setValid(false);
        }else{
            setValid(true);
        }
    }
    const onChangeQt = (e) => {
        setQt(e.target.value);
        if (e.target.value < 0 || prix <=0 || nom === "") {
            setValid(false);
        }else{
            setValid(true);
        }
    }
    const onChangePrix = (e) => {
        setPrix(e.target.value);
        if (e.target.value <= 0 || qt <0 || nom === "") {
            setValid(false);
        }else{
            setValid(true);
        }
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if(qt === ""){
            setQt(0);
        }
        ipcRenderer.send('modif-medicament', { value1: nom, value2: qt, value3: prix, value4: idMedicament });
        navigate('/medic');
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
                            <button type="submit" className="btn btn-primary" disabled={!valid}><i className="bi bi-database-fill-add"></i>{' '}Modifier</button>
                        </form>
                    </div>
                </div>
            </div>
        </>)
};

export default ModifMedic;