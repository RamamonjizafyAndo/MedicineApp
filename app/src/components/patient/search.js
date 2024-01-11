import React from "react";

function SearchPatient(props){
    return(
        <>
        <>
            <div className="card" >
                <ol class="list-group list-group-numbered">
                    {props.data && props.data.map((value) => {
                        return (
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{value.namePtn}</div>
                                </div>
                                <span className="badge">
                                    <button className="btn btn-outline-danger" id={value.idPtn}><i className="bi bi-ticket-detailed-fill"></i>Détails</button>
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

export default SearchPatient;