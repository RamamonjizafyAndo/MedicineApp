import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
function ListeFact() {
    const [data, setData] = useState([]);
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
    
    return (
        <>
            <div className="card" >
                <ol class="list-group list-group-numbered">
                    {data && data.map((value) => {
                        return (
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{value.date}</div>
                                    <div>Prix: {value.prixMed}Ar</div>
                                </div>
                                <span className="badge">
                                    <button className="btn btn-outline-danger"><i className="bi bi-ticket-detailed-fill"></i>Voir</button>
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