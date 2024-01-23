import React from "react";
import { useNavigate } from "react-router-dom";

function SearchPatient(props){
    const navigate = useNavigate();
    const onClickDetail = (e)=>{
        localStorage.removeItem('idPtn');
        localStorage.setItem('idPtn',e.target.id);
        navigate('/patient/detail');
    }
    const addPtnOrdonnance = (e)=>{
        localStorage.removeItem('idPtnOrd');
        localStorage.setItem('idPtnOrd',e.target.id)
        console.log(localStorage.getItem('idPtnOrd'));
    }
    return(
        <>
            <div className="card" >
                <ol className="list-group list-group-numbered">
                    {props.data && props.data.map((value) => {
                        return (
                            <li key={value.idPtn} className="list-group-item d-flex justify-content-between align-items-start">
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
}

export default SearchPatient;