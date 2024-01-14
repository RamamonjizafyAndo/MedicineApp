import React, { useEffect, useState } from "react";
import SearchPatient from "../patient/search";
import { ipcRenderer } from "electron";

function CreateFact() {
    const [patient, setPatient] = useState(null);
    const [idPtn, setIdPtn] = useState('');
    const [searchMedicament, setSearchMedicament] = useState('');
    const [isSearchMedicament, setIsSearchMedicament] = useState(false)
    const [searchPatient, setSearchPatient] = useState('');
    const [isSearchPatient, setIsSearchPatient] = useState(false);
    const [dataPatient, setDataPatient] = useState([]);
    const [dataMedicament, setDataMedicament] = useState([]);
    const [validatedAddPrn, setValidatedAddPtn] = useState(false);
    const [validatedMed, setValidatedMed] = useState(false);
    const [bilan, setBilan] = useState('');
    const [temperature, setTemperature] = useState('');
    const [poids, setPoids] = useState();
    const [tension, setTension] = useState();
    const [oxygene, setOxygene] = useState();
    const [quantite, setQuantite] = useState();
    const [mode, setMode] = useState('');
    const [medicament, setMedicament] = useState([]);
    const [selectedMed, setSelectedMed] = useState(null);
    const [selectedPtn, setSelectedPtn] = useState(null);
    const [currentSearchType, setCurrentSearchType] = useState(null);
    const [currentAddType, setCurrentAddType] = useState(null);
    const onChangeTemp = (e) => {
        if (e.target.value <= 0 || selectedPtn == null || bilan == '' || poids <= 0 || tension == "" || oxygene == "") {
            setValidatedAddPtn(false)
        } else {
            setValidatedAddPtn(true)
        }
        setTemperature(e.target.value);
    }
    const onChangePoids = (e) => {
        if (e.target.value <= 0 || selectedPtn == null || bilan == '' || temperature <= 0 || tension == "" || oxygene == "") {
            setValidatedAddPtn(false)
        } else {
            setValidatedAddPtn(true)
        }
        setPoids(e.target.value);
    }
    const onChangeTension = (e) => {
        if (e.target.value == "" || selectedPtn == null || bilan == '' || poids <= 0 || temperature <= 0 || oxygene == "") {
            setValidatedAddPtn(false)
        } else {
            setValidatedAddPtn(true)
        }
        setTension(e.target.value);
    }
    const onChangeOxygene = (e) => {
        if (e.target.value == "" || selectedPtn == null || bilan == '' || poids <= 0 || tension == "" || temperature <= 0) {
            setValidatedAddPtn(false)
        } else {
            setValidatedAddPtn(true)
        }
        setOxygene(e.target.value);
    }
    const onChangeQuantite = (e) => {
        if (e.target.value <= 0 || !e.target.value || mode === '' || selectedMed === null) {
            setValidatedMed(false)
        } else {
            setValidatedMed(true)
        }
        setQuantite(e.target.value);
    }
    const onCHangeMode = (e) => {
        if (e.target.value === '' || quantite <= 0 || !quantite || selectedMed === null) {
            setValidatedMed(false)
        } else {
            setValidatedMed(true)
        }
        setMode(e.target.value);
    }
    const onChangeBilan = (e) => {
        if (e.target.value == "" || selectedPtn == null || oxygene == '' || poids <= 0 || tension == "" || temperature <= 0) {
            setValidatedAddPtn(false)
        } else {
            setValidatedAddPtn(true)
        }
        setBilan(e.target.value)
    }
    const handleRadioChangeMed = (event) => {
        console.log(medicament);
        setSelectedMed(event.target.id);
        console.log(JSON.stringify(medicament.find((medicament) => String(medicament.idMed) === String(event.target.id))));
        if (mode === '' || quantite <= 0 || event.target.id === null || JSON.stringify(medicament.find((medicament) => String(medicament.idMed) === String(event.target.id)))) {
            setValidatedMed(false)
        } else {
            setValidatedMed(true)
        }
    };
    const handleRadioChangePtn = (e) => {
        setSelectedPtn(e.target.id);
        if (e.target.id == "" || oxygene == "" || bilan == '' || poids <= 0 || tension == "" || temperature <= 0) {
            setValidatedAddPtn(false)
        } else {
            setValidatedAddPtn(true)
        }
    }
    useEffect(() => {
        const searchDataResponseListener = (event, results) => {
            if (currentSearchType === 'patient') {
                setDataPatient(results);
            } else if (currentSearchType === 'medicament') {
                setDataMedicament(results);
            }
        };

        const addDataResponseListener = (event, response) => {
            if (currentAddType === 'patient') {
                const patientListener = {
                    idPtn: response[0].idPtn,
                    namePtn: response[0].namePtn,
                    agePtn: response[0].agePtn,
                    sexePtn: response[0].sexePtn,
                    maladie: bilan,
                    temperature: temperature,
                    poids: poids,
                    tension: tension,
                    oxygene: oxygene
                }
                setPatient(patientListener);
            } else if (currentAddType === 'medicament') {
                const medicamentListener = [
                    {
                        idMed: response[0].idMed,
                        nomMed: response[0].nomMed,
                        qtMed: quantite,
                        mode : mode,
                        prixMed: quantite * response[0].prixMed
                    }
                ]
                setMedicament(prevMedicament => [...prevMedicament, ...medicamentListener]);
            }
        };

        ipcRenderer.on('select-data-reply', addDataResponseListener);

        ipcRenderer.on('searchDataResponse', searchDataResponseListener);

        return () => {
            ipcRenderer.removeListener('searchDataResponse', searchDataResponseListener);
            ipcRenderer.removeListener('select-data-reply', addDataResponseListener);
        };
    }, [currentSearchType, currentAddType]);
    const onChangeSearchMedicament = (e) => {

        if (e.target.value == '') {
            setIsSearchMedicament(false);
            setSelectedMed(null);
            setValidatedMed(false);
        }
        setSearchMedicament(e.target.value);
    }
    const onChangeSearchPatient = (e) => {
        if (e.target.value == '') {
            setIsSearchPatient(false);
            setSelectedPtn(null);
            setValidatedAddPtn(false);
        }
        setSearchPatient(e.target.value)
    }
    const onSearchPatient = (e) => {
        e.preventDefault();

        ipcRenderer.send('searchData', "Patients", [{ column: 'namePtn', value: searchPatient }, { column: 'agePtn', value: searchPatient }, { column: 'sexePtn', value: searchPatient }]);
        setCurrentSearchType('patient');
        setIsSearchPatient(true);
    };

    const onSearchMedicament = (e) => {
        e.preventDefault();

        ipcRenderer.send('searchData', "Medicaments", [{ column: 'nomMed', value: searchMedicament }, { column: 'qtMed', value: searchMedicament }, { column: 'prixMed', value: searchMedicament }]);
        setCurrentSearchType('medicament');
        setIsSearchMedicament(true);
    };

    const addPtnOrdonnance = (e) => {
        e.preventDefault();
        setIdPtn(selectedPtn);
        ipcRenderer.send('select-data', 'SELECT * FROM Patients WHERE idPtn = ?', [selectedPtn]);
        setCurrentAddType('patient');
    }

    const addMednOrdonnance = (e) => {
        e.preventDefault();
        setIdPtn(selectedMed);
        ipcRenderer.send('select-data', 'SELECT * FROM Medicaments WHERE idMed = ?', [selectedMed]);
        setIsSearchMedicament(false);
        setValidatedMed(false);
        setSearchMedicament('');
        setCurrentAddType('medicament');
    }

    const filterMed = (e) => {
        setMedicament(medicament.filter((value) => String(value.idMed) !== String(e.currentTarget.id)));
        setSearchMedicament('');
        setIsSearchMedicament(false);
        setValidatedMed(false);
    }
    const filterPtn = (e) => {
        setPatient(patient.filter((value) => String(value.idPtn) !== String(e.currentTarget.id)))
        setIsSearchPatient(false);
        setSearchPatient('');
        setValidatedAddPtn(false);
    }
    return (
        <>
            <p className="text-center title"> Créer une ordonnance</p>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Patient</h5>
                                <p className="card-text">
                                    <form className="d-flex" role="search" onSubmit={onSearchPatient}>
                                        <input className="form-control me-2" type="search" onChange={onChangeSearchPatient} value={searchPatient} placeholder="Recherche" aria-label="Recherche" />
                                        <button className="btn btn-outline-success" type="submit">Recherche</button>
                                    </form>
                                </p>
                                {
                                    isSearchPatient && <div className="card-text">
                                        <div className="card" >
                                            <ol className="list-group list-group-numbered">
                                                {dataPatient && dataPatient.map((value) => {
                                                    return (
                                                        <li className="list-group-item d-flex justify-content-between align-items-start" key={value.idPtn}>
                                                            <div className="ms-2 me-auto">
                                                                <div className="fw-bold">{value.namePtn}</div>
                                                            </div>
                                                            <span className="badge">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name="radioPtn"
                                                                    id={value.idPtn}
                                                                    onChange={handleRadioChangePtn}
                                                                    color="red"
                                                                    width={300}
                                                                />
                                                            </span>
                                                        </li>
                                                    )
                                                })}
                                            </ol>
                                        </div>
                                    </div>
                                }
                                <div className="card-text">
                                    <form onSubmit={addPtnOrdonnance}>
                                        <div className="mb-3">
                                            <label for="bilan" className="form-label">
                                                Bilan du patient
                                            </label>
                                            <input type="text" id="bilan" className="form-control" value={bilan} onChange={onChangeBilan} />
                                        </div>
                                        <div className="mb-3">
                                            <div className="container text-center">
                                                <div className="row">
                                                    <label className="col form-label">
                                                        T°
                                                    </label>
                                                    <label className="col form-label">
                                                        TA
                                                    </label>
                                                    <label className="col form-label">
                                                        SpO²
                                                    </label>
                                                    <label className="col form-label">
                                                        Poids
                                                    </label>
                                                </div>
                                                <div className="row">
                                                    <input type="number" value={temperature} onChange={onChangeTemp} width={50} className="col form-control" />
                                                    <input type="text" value={tension} onChange={onChangeTension} width={50} className="col form-control" />
                                                    <input type="text" width={50} value={oxygene} onChange={onChangeOxygene} className="col form-control" />
                                                    <input type="number" width={50} value={poids} onChange={onChangePoids} className="col form-control" />
                                                </div>
                                            </div>
                                        </div>

                                        <button className="btn btn-primary" type="submit" disabled={!validatedAddPrn}>Ajouter</button>
                                    </form>
                                </div>
                            </div>
                            <div className="card-footer">
                                <ol className="list-group">
                                    {patient &&
                                        <li className="list-group-item d-flex justify-content-between align-items-start" key={patient.idPtn}>
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">{patient.namePtn}</div>
                                                <div>Age: {patient.agePtn}</div>
                                                <div>Sexe: {patient.sexePtn}</div>
                                                <div>Maladie: {patient.maladie}</div>
                                                <div>Temperature: {patient.temperature}</div>
                                                <div>Poids: {patient.poids}</div>
                                                <div>Tension: {patient.tension}</div>
                                                <div>Oxygène: {patient.oxygene}</div>
                                            </div>
                                            <span className="badge">
                                                <button className="btn btn-outline-danger" id={patient.idPtn} onClick={filterPtn}><i className="bi bi-x"></i></button>
                                            </span>
                                        </li>
                                    }
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Médicaments</h5>
                                <p className="card-text">
                                    <form className="d-flex" role="search" onSubmit={onSearchMedicament}>
                                        <input className="form-control me-2" type="search" placeholder="Recherche" aria-label="Recherche" value={searchMedicament} onChange={onChangeSearchMedicament} />
                                        <button className="btn btn-outline-success" type="submit" >Recherche</button>
                                    </form>
                                </p>
                                <div className="card-text">
                                    {
                                        isSearchMedicament &&
                                        <div className="card" >
                                            <ol className="list-group list-group-numbered">
                                                {dataMedicament && dataMedicament.map((value) => {
                                                    return (
                                                        <li className="list-group-item d-flex justify-content-between align-items-start" key={value.idMed}>
                                                            <div className="ms-2 me-auto">
                                                                <div className="fw-bold">{value.nomMed}</div>
                                                                <div>Quantité: {value.qtMed}</div>
                                                                <div>PU: {value.prixMed}Ar</div>
                                                            </div>
                                                            <span className="badge">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name="radioMed"
                                                                    id={value.idMed}
                                                                    onChange={handleRadioChangeMed}
                                                                    color="red"
                                                                    width={300}
                                                                />
                                                            </span>
                                                        </li>
                                                    )
                                                })}
                                            </ol>
                                        </div>
                                    }
                                </div>
                                <p className="card-text">
                                    <form onSubmit={addMednOrdonnance}>
                                        <div className="mb-3">
                                            <label for="bilan" className="form-label">
                                                Quantité
                                            </label>
                                            <input type="number" id="bilan" className="form-control" value={quantite} onChange={onChangeQuantite} />
                                        </div>
                                        <div className="mb-3">
                                            <label for="bilan" className="form-label">
                                                Mode d'utilisation
                                            </label>
                                            <input type="text" id="bilan" className="form-control" value={mode} onChange={onCHangeMode} />
                                        </div>
                                        <button className="btn btn-primary" disabled={!validatedMed} type="onSubmit">Ajouter</button>
                                    </form>
                                </p>
                            </div>
                            <div className="card-footer">
                                <ol className="list-group list-group-numbered">
                                    {medicament && medicament.map((value) => {
                                        return (
                                            <li className="list-group-item d-flex justify-content-between align-items-start" key={value.idMed}>
                                                <div className="ms-2 me-auto">
                                                    <div className="fw-bold">{value.nomMed}</div>
                                                    <div>Quantité: {value.qtMed} ({value.prixMed}Ar)</div>
                                                    <div>Mode d'utilisation: {value.mode}</div>
                                                </div>
                                                <span className="badge">
                                                    <button className="btn btn-outline-danger" id={value.idMed} onClick={filterMed}><i className="bi bi-x"></i></button>
                                                </span>
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