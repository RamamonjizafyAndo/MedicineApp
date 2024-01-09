import React from "react";

function AddPatient() {
    return (
        <>
            <p className="text-center">
                Ajout patient
            </p>
            <div className="container-fluid" >
                <div className="card">
                    <div className="card-body">
                        <form>
                            <div class="mb-3">
                                <label for="nomPatient" class="form-label">Nom et prénoms</label>
                                <input type="text" class="form-control" id="nomPatient" aria-describedby="emailHelp" />
                            </div>
                            <div class="mb-3">
                                <label for="agePatient" class="form-label">Age</label>
                                <input type="number" class="form-control" id="agePatient " />
                            </div>
                            <div class="mb-3 form-check">
                            <label class="form-label">Sexe</label>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="radioAge" id="flexRadioDefault1" />
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            Homme
                                        </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="radioAge" id="flexRadioDefault2" checked />
                                        <label class="form-check-label" for="flexRadioDefault2">
                                            Femme
                                        </label>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary"><i className="bi bi-person-plus-fill"></i>{' '}Ajouter</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddPatient