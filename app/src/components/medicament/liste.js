import React, { useContext, useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../hooks/contextPatient";

function ListeMedic() {
    const [data, setData] = useState([]);
    const { changeIdMedicament } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        ipcRenderer.send('select-data', 'SELECT * FROM Medicaments');

        const handleSelectDataReply = (event, response) => {
            setData(response);
        };

        ipcRenderer.on('select-data-reply', handleSelectDataReply);

        return () => {
            ipcRenderer.removeListener('select-data-reply', handleSelectDataReply);
        };
    }, []);

    const detailMed = async (e) => {
        await changeIdMedicament(e.currentTarget.id);
        setTimeout(() => {
            navigate('/medic/detail');
        }, 500)
    }

    const isDatePassed = (datePerrupt) => {
        const today = new Date();
        const peremptionDate = new Date(datePerrupt);
        return peremptionDate < today;
    }

    return (
        <>
            <div className="card" >
                <ol className="list-group list-group-numbered">
                    {data && data.map((value) => {
                        const datePassed = value.datePerrupt && isDatePassed(value.datePerrupt);
                        return (
                            <li key={value.idMed} className={`list-group-item d-flex justify-content-between align-items-start ${datePassed ? 'text-danger' : ''}`}>
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
