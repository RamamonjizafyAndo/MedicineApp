import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import { useNavigate } from "react-router-dom";

function DetailMed() {
    const navigate = useNavigate();
    const [dataMed, setDataPatient] = useState([]);
    const [onSuppr, setOnSuppr] = useState(false)
    useEffect(() => {
        ipcRenderer.send('select-data', `SELECT * FROM Medicaments WHERE idMed = ${localStorage.getItem('idMed')}`);
        ipcRenderer.on('select-data-reply', (event, response) => {
            setDataPatient(response)
        }, []);
    }, []);
    return (
        <>
            <p className="text-center">
                Détail du médicament
            </p>
            {
                dataMed && dataMed.map((value) => {
                    return (
                        <div className="container-fluid">
                            <div className="card">
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
                                                        <button className="p-2 g-col-6 btn btn-outline-danger" >Oui</button>{' '}
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