import React, { useContext, useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import { UserContext } from "../../hooks/contextPatient";
import { useNavigate } from "react-router-dom";

function BilanPatient() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const {idUser, changeOrdonnance} = useContext(UserContext);
    useEffect(() => {
        if (idUser) {
            ipcRenderer.send('select-data', 'SELECT ref, maladie FROM Ordonnances WHERE idPtn = ?', [idUser]);
        }
    
        const handleSelectDataReply = (event, response) => {
            setData(response);
        };
    
        ipcRenderer.on('select-data-reply', handleSelectDataReply);
    
        // Nettoyage de l'effet
        return () => {
            ipcRenderer.removeListener('select-data-reply', handleSelectDataReply);
        };
    }, [idUser]);
    const onShowDetail = async(e)=>{
        await changeOrdonnance(e.currentTarget.id);
        setTimeout(()=>{
            navigate('/fact/detail');
        },500)
    }
    return (
        <>
            <p className="text-center">
                Bilan
            </p>
            <div className="card" >
                <ol className="list-group list-group-numbered">
                    {data && data.map((value) => {
                        return (
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{value.maladie}</div>
                                </div>
                                <span className="badge">
                                    <button className="btn btn-outline-danger" id={value.ref} onClick={onShowDetail}><i className="bi bi-ticket-detailed-fill"></i>Voir</button>
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