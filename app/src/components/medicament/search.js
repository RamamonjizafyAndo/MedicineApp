import React from "react";
import { useNavigate } from "react-router-dom";

function SearchMedic(props){
    const navigate = useNavigate();
    const onClickDetail = (e)=>{
        localStorage.removeItem('idPtn');
        localStorage.setItem('idPtn',e.target.id);
        navigate('/patient/detail');
    }
    return(
        <>
        <>
            <div className="card" >
                <ol className="list-group list-group-numbered">
                    {props.data && props.data.map((value) => {
                        return (
                            <li key={value.idMed} className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{value.nomMed}</div>
                                    <div>Quantité: {value.qtMed}</div>
                                    <div>Prix: {value.prixMed}Ar</div>
                                </div>
                                <span className="badge">
                                    <button className="btn btn-outline-danger"><i className="bi bi-ticket-detailed-fill"></i>Détails</button>
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