import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import BilanPatient from "./bilan";
function DetailPatient() {
    const [dataPatient, setDataPatient] = useState([]);
    useEffect(() => {
        ipcRenderer.send('select-data', `SELECT * FROM Patients WHERE idPtn = ${localStorage.getItem('idPtn')}`);
        ipcRenderer.on('select-data-reply', (event, response) => {
            setDataPatient(response)
        }, []);
    }, [])
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
                                </div>
                                <div className="grid gap-3">
                                    <button className="p-2 g-col-6 btn btn-outline-success">Ordonnance</button>
                                    <button className="p-2 g-col-6 btn btn-outline-primary">Modifier</button>
                                    <button className="p-2 g-col-6 btn btn-outline-danger">Supprimer</button>
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