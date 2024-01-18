import React, { useContext, useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import BilanPatient from "./bilan";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../hooks/contextPatient";

function DetailPatient() {
    const {idUser} = useContext(UserContext)
    const navigate = useNavigate();
    const [dataPatient, setDataPatient] = useState([]);
    const [onSuppr, setOnSuppr] = useState(false);
    useEffect(() => {
        console.log(idUser);
        console.log(dataPatient);
        if (idUser) {
            ipcRenderer.send('select-data', 'SELECT * FROM Patients WHERE idPtn = ?', [idUser]);
        }
    
        const handleSelectDataReply = (event, response) => {
            setDataPatient(response);
        };
    
        ipcRenderer.on('select-data-reply', handleSelectDataReply);
        return () => {
            ipcRenderer.removeListener('select-data-reply', handleSelectDataReply);
        };        
    }, [idUser, dataPatient]);
    
    const onDelete = (e) => {
        e.preventDefault();
        ipcRenderer.send('delete-patient', { value1: idUser});
        navigate('/patient');
    }
    return (
        <>
            <p className="text-center title">
                Détail du patient
            </p>
            {
                dataPatient && dataPatient.map((value) => {
                    return (
                        <div className="container-fluid" key={value.idPtn}>
                            <div className="card card-detail">
                                <div className="card-body">
                                    <p className="card-text">Nom: {value.namePtn}</p>
                                    <p className="card-text">Age: {value.agePtn}</p>
                                    <p className="card-text">Sexe: {value.sexePtn}</p>
                                    <p>
                                        <button className="p-2 g-col-6 btn btn-outline-primary" onClick={(e)=>{navigate('/patient/modif')}}>Modifier</button>
                                    </p>
                                    <p>
                                        {
                                            !onSuppr ? <button className="p-2 g-col-6 btn btn-outline-danger" onClick={(e) => { e.preventDefault(); setOnSuppr(true) }}>Supprimer</button> :
                                                <div>
                                                    Êtes vous vouloir sûre de supprimer?
                                                    <p>
                                                        <button className="p-2 g-col-6 btn btn-outline-danger" onClick={onDelete}>Oui</button>{' '}
                                                        <button className="p-2 g-col-6 btn btn-outline-success" onClick={(e) => { e.preventDefault(); setOnSuppr(false) }}>Non</button>
                                                    </p>
                                                </div>
                                        }
                                    </p>
                                </div>

                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default DetailPatient;