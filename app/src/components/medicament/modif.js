import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { UserContext } from "../../hooks/contextPatient";
const { ipcRenderer } = require('electron');

function ModifMedic() {
    const { idMedicament } = useContext(UserContext)
    const navigate = useNavigate();
    const [medicament, setMedicament] = useState({
        nom: '',
        qt: '',
        prix: ''
    });
    useEffect(() => {
        if (idMedicament) {
            ipcRenderer.send('select-data', 'SELECT * FROM Medicaments WHERE idMed = ?', [idMedicament]);
        }

        const handleSelectDataReply = (event, response) => {
            setMedicament({
                nom:response[0].nomMed,
                qt:response[0].qtMed,
                prix:response[0].prixMed
            })
        };

        ipcRenderer.on('select-data-reply', handleSelectDataReply);

        // Nettoyage de l'effet
        return () => {
            ipcRenderer.removeListener('select-data-reply', handleSelectDataReply);
        };
    }, [idMedicament]);
    const onSubmit = (e) => {
        e.preventDefault();
        if(medicament.qt === ""){
            setMedicament({...medicament, qt:0})
        }
        ipcRenderer.send('modif-medicament', { value1: medicament.nom, value2: medicament.qt, value3: medicament.prix, value4: idMedicament });
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
                                <label htmlFor="nomMed" className="form-label">Désignation</label>
                                <input type="text" value={medicament.nom} onChange={(e)=>{setMedicament({...medicament, nom: e.target.value})}} className="form-control" id="nomMed" aria-describedby="nomMed" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="qt" className="form-label">Quantité</label>
                                <input type="number" value={medicament.qt} onChange={(e)=> setMedicament({...medicament, qt: e.target.value})} className="form-control" id="qt " />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor='prix'>Prix</label>
                                <input type="number" value={medicament.prix} onChange={(e)=>{setMedicament({...medicament, prix: e.target.value})}} className="form-control" id="prix " />
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={(medicament.prix || medicament.qt ) < 0 || medicament.nom == ''}><i className="bi bi-database-fill-add"></i>{' '}Modifier</button>
                        </form>
                    </div>
                </div>
            </div>
        </>)
};

export default ModifMedic;