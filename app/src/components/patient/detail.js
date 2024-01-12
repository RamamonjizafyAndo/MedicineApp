import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import BilanPatient from "./bilan";
import { useNavigate } from "react-router-dom";

function DetailPatient() {
    const navigate = useNavigate();
    const [dataPatient, setDataPatient] = useState([]);
    const [onSuppr, setOnSuppr] = useState(false)
    useEffect(() => {
        ipcRenderer.send('select-data', `SELECT * FROM Patients WHERE idPtn = ${localStorage.getItem('idPtn')}`);
        ipcRenderer.on('select-data-reply', (event, response) => {
            setDataPatient(response)
        }, []);
    }, [])
    const onDelete = (e) => {
        e.preventDefault();
        ipcRenderer.send('delete-patient', { value1: localStorage.getItem('idPtn') });
        navigate('/patient');
    }
    return (
        <>
            <p className="text-center">
                Détail du patient
            </p>
            {
                dataPatient && dataPatient.map((value) => {
                    return (
                        <div className="container-fluid">
                            <div className="card">
                                <div className="card-body">
                                    <p className="card-text">Nom: {value.namePtn}</p>
                                    <p className="card-text">Age: {value.agePtn}</p>
                                    <p className="card-text">Sexe: {value.sexePtn}</p>
                                    <p>
                                        <button className="p-2 g-col-6 btn btn-outline-success">Ordonnance</button>
                                    </p>
                                    <p>
                                        <button className="p-2 g-col-6 btn btn-outline-primary">Modifier</button>
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
            <BilanPatient />
        </>
    )
}

export default DetailPatient;