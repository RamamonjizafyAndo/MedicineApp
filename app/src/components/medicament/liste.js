import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import { useNavigate } from "react-router-dom";
function ListeMedic() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        ipcRenderer.send('select-data', 'SELECT * FROM Medicaments');
        ipcRenderer.on('select-data-reply', (event, response) => {
            setData(response)
        }, []);
    }, []);
    const detailMed = (e)=>{
        localStorage.removeItem('idMed');
        localStorage.setItem('idMed', e.target.id);
        navigate('/medic/detail');
    }
    return (
        <>
            <div className="card" >
                <ol class="list-group list-group-numbered">
                    {data && data.map((value) => {
                        return (
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{value.nomMed}</div>
                                    <div>Quantité: {value.qtMed}</div>
                                    <div>Prix: {value.prixMed}Ar</div>
                                </div>
                                <span className="badge">
                                    <button onClick={detailMed} className="btn btn-outline-danger" id={value.idMed}><i className="bi bi-ticket-detailed-fill"></i>Détails</button>
                                </span>
                            </li>
                        )
                    })}
                </ol>
            </div>
        </>
    )
};

export default ListeMedic;