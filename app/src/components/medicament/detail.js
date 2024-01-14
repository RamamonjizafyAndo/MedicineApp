import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import { useNavigate } from "react-router-dom";

function DetailMed() {
    const navigate = useNavigate();
    const [dataMed, setDataPatient] = useState([]);
    const [onSuppr, setOnSuppr] = useState(false)
    useEffect(() => {
        const idMed = localStorage.getItem('idMed');
        if (idMed) {
            ipcRenderer.send('select-data', 'SELECT * FROM Medicaments WHERE idMed = ?', [idMed]);
        }
    
        const handleSelectDataReply = (event, response) => {
            setDataPatient(response);
        };
    
        ipcRenderer.on('select-data-reply', handleSelectDataReply);
    
        // Nettoyage de l'effet
        return () => {
            ipcRenderer.removeListener('select-data-reply', handleSelectDataReply);
        };
    }, [localStorage.getItem('idMed')]);
    const onDelete = (e)=>{
        ipcRenderer.send('delete-medicament', {value1: localStorage.getItem('idMed') && localStorage.getItem('idMed')});
        navigate('/medic');
    }
    return (
        <>
            <p className="text-center title">
                Détail du médicament
            </p>
            {
                dataMed && dataMed.map((value) => {
                    return (
                        <div className="container-fluid">
                            <div className="card card-detail">
                                <div className="card-body">
                                    <p className="card-text">Nom: {value.nomMed}</p>
                                    <p className="card-text">Prix: {value.prixMed}</p>
                                    <p className="card-text">Quantité: {value.qtMed}</p>
                                    <p>
                                        <button className="p-2 g-col-6 btn btn-outline-success">Ordonnance</button>
                                    </p>
                                    <p>
                                        <button className="p-2 g-col-6 btn btn-outline-primary" onClick={(e)=>{navigate('/patient/modif')}}>Modifier</button>
                                    </p>
                                    <p>
                                        {
                                            !onSuppr ? <button className="p-2 g-col-6 btn btn-outline-danger" onClick={(e) => { e.preventDefault(); setOnSuppr(true) }}>Supprimer</button> :
                                                <div>
                                                    Êtes vous vouloir sûre de supprimer?
                                                    <p>
                                                        <button className="p-2 g-col-6 btn btn-outline-danger" onClick={onDelete}>Oui</button>{' '}
                                                        <button className="p-2 g-col-6 btn btn-outline-success" onClick={(e) => { e.preventDefault(); setOnSuppr(false) }}>Non</button>
                                                    </p>
                                                </div>
                                        }
                                    </p>
                                </div>

                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default DetailMed;