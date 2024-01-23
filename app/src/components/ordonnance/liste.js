import React, { useContext, useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../hooks/contextPatient";
function ListeFact() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const {changeOrdonnance} = useContext(UserContext);
    useEffect(() => {
        // Envoyer la requête pour sélectionner les données
        ipcRenderer.send('select-data', 'SELECT * FROM Ordonnances');
    
        // Fonction pour gérer la réponse
        const handleSelectDataReply = (event, response) => {
            setData(response);
        };
    
        // Ajouter l'écouteur d'événements pour la réponse
        ipcRenderer.on('select-data-reply', handleSelectDataReply);
    
        // Nettoyage : Supprimer l'écouteur d'événements lors du démontage du composant
        return () => {
            ipcRenderer.removeListener('select-data-reply', handleSelectDataReply);
        };
    }, []); // Le tableau de dépendances vide signifie que cet effet s'exécutera une fois après le premier rendu
    const onShowDetail = async(e)=>{
        console.log(e.currentTarget.id);
        await changeOrdonnance(e.currentTarget.id);
        setTimeout(()=>{
            navigate('/fact/detail');
        },500)
        
    }
    return (
        <> 
            <div className="card" >
                <ol className="list-group list-group-numbered">
                    {data && data.map((value) => {
                        return (
                            <li className="list-group-item d-flex justify-content-between align-items-start" key={value.ref}>
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{value.ref}</div>
                                    <div>Prix: {value.prix}Ar</div>
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
};

export default ListeFact;