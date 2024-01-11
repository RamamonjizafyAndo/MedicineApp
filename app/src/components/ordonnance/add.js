import React, { useState } from "react";

function CreateFact() {
    const [patient, setPatient] = useState({ nom: 'RAMAMONJIZAFY Manitra Andonirina' })
    const [medicament, setMedicament] = useState([
        {
            nomMed: 'coucou',
            prixMed: 200
        },
        {
            nomMed: 'coucou',
            prixMed: 200
        }
    ])
    return (
        <>
            <p className="text-center"> Créer une ordonnance</p>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Patient</h5>
                                <p className="card-text"><form className="d-flex" role="search">
                                    <input className="form-control me-2" type="search" placeholder="Recherche" aria-label="Recherche" />
                                    <button className="btn btn-outline-success" type="submit">Recherche</button>
                                </form></p>
                                <p className="card-text">
                                    <form>
                                        <label for="bilan">
                                            Bilan du patient
                                        </label>
                                        <input type="text" id="bilan" />
                                        <button href="#" className="btn btn-primary">Ajouter</button>
                                    </form>
                                </p>
                                
                            </div>
                            <div class="card-footer">
                                {patient && patient.nom}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Médicaments</h5>
                                <p className="card-text">
                                    <form className="d-flex" role="search">
                                        <input className="form-control me-2" type="search" placeholder="Recherche" aria-label="Recherche" />
                                        <button className="btn btn-outline-success" type="submit">Recherche</button>
                                    </form>
                                </p>
                                <p className="card-text">
                                    <form>
                                        <div class="mb-3">
                                            <label for="bilan">
                                                Quantité
                                            </label>
                                            <input type="number" id="bilan" />
                                        </div>
                                        <div class="mb-3">
                                            <label for="bilan">
                                                Mode d'utilisation
                                            </label>
                                            <input type="text" id="bilan" />
                                        </div>
                                        <button className="btn btn-primary">Ajouter</button>
                                    </form>
                                </p>
                            </div>
                            <div className="card-footer">
                                <ol class="list-group list-group-numbered">
                                    {medicament && medicament.map((value) => {
                                        return (
                                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                                <div className="ms-2 me-auto">
                                                    <div className="fw-bold">{value.nomMed}</div>
                                                    <div>Prix: {value.prixMed}Ar</div>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default CreateFact;