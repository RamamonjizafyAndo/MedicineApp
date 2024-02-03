import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../hooks/contextPatient";

function SearchMedic(props){
    const navigate = useNavigate();
    const { changeIdMedicament } = useContext(UserContext);
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
    return(
        <>
        <>
            <div className="card" >
                <ol className="list-group list-group-numbered">
                    {props.data && props.data.map((value) => {
                        const datePassed = value.datePerrupt && isDatePassed(value.datePerrupt);
                        return (
                            <li key={value.idMed} className={`list-group-item d-flex justify-content-between align-items-start ${datePassed ? 'text-danger' : ''}`}>
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{value.nomMed}</div>
                                    <div>Quantité: {value.qtMed}</div>
                                    <div>Prix: {value.prixMed}Ar</div>
                                </div>
                                <span className="badge">
                                    <button className="btn btn-outline-danger" onClick={detailMed} id={value.idMed}><i className="bi bi-ticket-detailed-fill"></i>Détails</button>
                                </span>
                            </li>
                        )
                    })}
                </ol>
            </div>
        </>
        </>
    )
}

export default SearchMedic;