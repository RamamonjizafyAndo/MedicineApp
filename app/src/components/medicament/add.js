import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
const { ipcRenderer } = require('electron');

function AddMedic() {
    const navigate = useNavigate();
    
    const [medicament, setMedicament] = useState({
        nom:'',
        qt:'',
        prix:'',
        validNameMed: true,
        date: null
    })

    useEffect(() => {
        const addMed = (event, response) => {
            console.log(response[0]);
            if (response.find((value)=>value.medStatus=='true')) {
                setMedicament({...medicament, validNameMed: false})
            } else {
                if((medicament.nom && medicament.qt && medicament.prix && medicament.date) !== "" || null){
                    ipcRenderer.send('insert-medicament', { value1: medicament.nom, value2: medicament.qt, value3: medicament.prix, value4: medicament.date });
                    navigate('/medic');
                }
            }
        }

        ipcRenderer.on('select-data-reply', addMed);
        return ()=>{
            ipcRenderer.removeListener('select-data-reply', addMed);
        }
    }, [medicament.nom, medicament.qt, medicament.prix])

    const onSubmit = (e) => {
        e.preventDefault();
        setMedicament({...medicament, nom: medicament.nom.toLowerCase()})
        ipcRenderer.send('select-data', "SELECT nomMed, CASE WHEN LOWER(nomMed) = ? THEN 'true' ELSE 'false' END AS medStatus FROM Medicaments", [medicament.nom]);
    }
    return (
        <>
            <p className="text-center title">
                Ajout médicament
            </p>
            <div className="container-fluid" >
                <div className="card card-add">
                    <div className="card-body">
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label htmlFor="nomMed" className="form-label">Désignation</label>
                                <input type="text" style={{ color: !medicament.validNameMed ? 'red' : 'black' }} value={medicament.nom} onChange={(e)=>{setMedicament({...medicament, nom: e.target.value})}} className="form-control" id="nomMed" aria-describedby="nomMed" />
                                {
                                    !medicament.validNameMed && 
                                    <div style={{ color: 'red' }}>
                                        Medicament déja existé
                                    </div>
                                }
                            </div>
                            <div className="mb-3">
                                <label className="form-label">
                                    Date de peremption
                                </label>
                                <input type="date" value={medicament.date} onChange={(e)=>setMedicament({...medicament, date: e.target.value})} className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="qt" className="form-label">Quantité</label>
                                <input type="number" value={medicament.qt} onChange={(e)=>{setMedicament({...medicament, qt: e.target.value})}} className="form-control" id="qt " />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor='prix'>Prix</label>
                                <input type="number" value={medicament.prix} onChange={(e)=>setMedicament({...medicament, prix: e.target.value})} className="form-control" id="prix " />
                            </div>
                            <button type="submit" className="btn btn-primary"><i className="bi bi-database-fill-add"></i>{' '}Ajouter</button>
                        </form>
                    </div>
                </div>
            </div>
        </>)
};

export default AddMedic;