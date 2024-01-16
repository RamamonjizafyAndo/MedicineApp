import React, { useContext, useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../hooks/contextPatient";
function ListeMedic() {
    const [data, setData] = useState([]);
    const {changeIdMedicament} = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        // Envoyer la requête pour sélectionner les données
        ipcRenderer.send('select-data', 'SELECT * FROM Medicaments');
    
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
    
    const detailMed = (e)=>{
        changeIdMedicament(e.target.id);
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