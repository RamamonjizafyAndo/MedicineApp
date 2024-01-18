import React, { useContext, useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../hooks/contextPatient";

function DetailMed() {
    const { idMedicament } = useContext(UserContext);
    const navigate = useNavigate();
    const [dataMed, setDataMed] = useState([]);
    const [onSuppr, setOnSuppr] = useState(false)
    useEffect(() => {
        console.log(idMedicament);
        console.log(dataMed);
        if (idMedicament) {
            ipcRenderer.send('select-data', 'SELECT * FROM Medicaments WHERE idMed = ?', [idMedicament]);
        }

        const handleSelectDataReply = (event, response) => {
            setDataMed(response);
        };
        
        ipcRenderer.on('select-data-reply', handleSelectDataReply);

        // Nettoyage de l'effet
        return () => {
            ipcRenderer.removeListener('select-data-reply', handleSelectDataReply);
        };
    }, [idMedicament, dataMed]);
    const onDelete = (e) => {
        ipcRenderer.send('delete-medicament', { value1: idMedicament });
        navigate('/medic');
    }
    return (
        <>
            <p className="text-center title">
                Détail du médicament
            </p>
            {
                dataMed ? dataMed.map((value) => {
                    return (
                        <div className="container-fluid" key={value.idMed}>
                            <div className="card card-detail">
                                <div className="card-body">
                                    <p className="card-text">Nom: {value.nomMed}</p>
                                    <p className="card-text">Prix: {value.prixMed}</p>
                                    <p className="card-text">Quantité: {value.qtMed}</p>
                                    <p className="card-text">Date de perruption: {value.datePerrupt}</p>
                                    <p>
                                        <button className="p-2 g-col-6 btn btn-outline-primary" onClick={(e) => { navigate('/medic/modif') }}>Modifier</button>
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
                }) :
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
            }
        </>
    )
}

export default DetailMed;