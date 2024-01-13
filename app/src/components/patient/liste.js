import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import { useNavigate } from "react-router-dom";
function ListePatient() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        ipcRenderer.send('select-data', 'SELECT * FROM Patients');
        ipcRenderer.on('select-data-reply', (event, response) => {
            setData(response)
        }, [])
    }, []);
    const onClickDetail = (e)=>{
        localStorage.removeItem('idPtn');
        localStorage.setItem('idPtn', e.target.id);
        navigate('/patient/detail');
    }
    return (
        <>
            <div className="card" >
                <ol class="list-group list-group-numbered">
                    {data && data.map((value) => {
                        return (
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{value.namePtn}</div>
                                </div>
                                <span className="badge">
                                    <button className="btn btn-outline-danger" id={value.idPtn} onClick={onClickDetail}><i className="bi bi-ticket-detailed-fill"></i>Détails</button>
                                </span>
                            </li>
                        )
                    })}
                </ol>
            </div>
        </>
    )
};

export default ListePatient;