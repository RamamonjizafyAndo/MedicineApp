import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";

function BilanPatient() {
    const [data, setData] = useState([]);
    useEffect(() => {
        ipcRenderer.send('select-data', `SELECT * FROM BilanPatients WHERE idPtn = ${localStorage.getItem('idPtn') && localStorage.getItem('idPtn')}`);
        ipcRenderer.on('select-data-reply', (event, response) => {
            setData(response)
        }, []);
    }, [])
    return (
        <>
            <p className="text-center">
                Bilan
            </p>
            <div className="card" >
                <ol class="list-group list-group-numbered">
                    {data && data.map((value) => {
                        return (
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{value.maladie}</div>
                                </div>
                                <span className="badge">
                                    <button className="btn btn-outline-danger"><i className="bi bi-ticket-detailed-fill"></i>Voir</button>
                                </span>
                            </li>
                        )
                    })}
                </ol>
            </div>
        </>
    )
}

export default BilanPatient;