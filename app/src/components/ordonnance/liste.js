import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
function ListeFact() {
    const [data, setData] = useState([]);
    useEffect(() => {
        ipcRenderer.send('select-data', 'SELECT * FROM Ordonnances');
        ipcRenderer.on('select-data-reply', (event, response) => {
            setData(response)
        }, []);
    }, [])
    return (
        <>
            <div className="card" >
                <ol class="list-group list-group-numbered">
                    {data && data.map((value) => {
                        return (
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{value.date}</div>
                                    <div>Prix: {value.prixMed}Ar</div>
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
};

export default ListeFact;