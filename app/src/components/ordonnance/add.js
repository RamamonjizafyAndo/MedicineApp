import React, { useEffect, useState } from "react";
import SearchPatient from "../patient/search";
import { ipcRenderer } from "electron";

function CreateFact() {
    const [patient, setPatient] = useState([]);
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
    const [quantite, setQuantite] = useState();
    const [mode, setMode] = useState('');
    const [medicament, setMedicament] = useState([]);
    const [selectedMed, setSelectedMed] = useState(null);
    const [selectedPtn, setSelectedPtn] = useState(null);
    const [currentSearchType, setCurrentSearchType] = useState(null);
    const [currentAddType, setCurrentAddType] = useState(null);
    const onChangeQuantite = (e)=>{
        if(e.target.value <= 0|| !e.target.value  || mode === '' || selectedMed === null){
            setValidatedMed(false)
        }else{
            setValidatedMed(true)
        }
        setQuantite(e.target.value);
    }
    const onCHangeMode = (e)=>{
        if(e.target.value === '' || quantite <= 0 || !quantite || selectedMed === null){
            setValidatedMed(false)
        }else{
            setValidatedMed(true)
        }
        setMode(e.target.value);
    }
    const onChangeBilan = (e)=>{
        if(e.target.value == '' || selectedPtn == null){
            setValidatedAddPtn(false)
        }else{
            setValidatedAddPtn(true)
        }
        setBilan(e.target.value)
    }
    const handleRadioChangeMed = (event) => {
        console.log(medicament);
        setSelectedMed(event.target.id);
        console.log(JSON.stringify(medicament.find((medicament)=> String(medicament.idMed) === String(event.target.id))));
        if(mode === '' || quantite <= 0 || event.target.id === null || JSON.stringify(medicament.find((medicament)=> String(medicament.idMed) === String(event.target.id)))){
            setValidatedMed(false)
        }else{
            setValidatedMed(true)
        }
    };
    const handleRadioChangePtn = (e) => {
        setSelectedPtn(e.target.id);
        if(selectedPtn !== '' || bilan !== ''){
            setValidatedAddPtn(false)
        }else{
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
            if(currentAddType === 'patient'){
                setPatient(response);
            }else if(currentAddType === 'medicament'){
                setMedicament(prevMedicament => [...prevMedicament, ...response]);
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
    return (
        <>
            <p className="text-center title"> Créer une ordonnance</p>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Patient</h5>
                                <div className="card-text">
                                    <form className="d-flex" role="search" onSubmit={onSearchPatient}>
                                        <input className="form-control me-2" type="search" onChange={onChangeSearchPatient} value={searchPatient} placeholder="Recherche" aria-label="Recherche" />
                                        <button className="btn btn-outline-success" type="submit">Recherche</button>
                                    </form>
                                </div>
                                {
                                    isSearchPatient && <div className="card-text">
                                        <div className="card" >
                                            <ol class="list-group list-group-numbered">
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
                                <p className="card-text">
                                    <form onSubmit={addPtnOrdonnance}>
                                        <div className="mb-3">
                                            <label for="bilan" className="form-label">
                                                Bilan du patient
                                            </label>
                                            <input type="text" id="bilan" className="form-control" value={bilan} onChange={onChangeBilan}/>
                                        </div>

                                        <button className="btn btn-primary" type="submit" disabled = {!validatedAddPrn}>Ajouter</button>
                                    </form>
                                </p>
                            </div>
                            <div class="card-footer">
                                {patient && patient.map((value) => {
                                    return <div key={value.idPtn}>{value.namePtn}</div>
                                })}
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
                                            <ol class="list-group list-group-numbered">
                                                {dataMedicament && dataMedicament.map((value) => {
                                                    return (
                                                        <li className="list-group-item d-flex justify-content-between align-items-start" key={value.idMed}>
                                                            <div className="ms-2 me-auto">
                                                                <div className="fw-bold">{value.nomMed}</div>
                                                                <div>Quantité: {value.qtMed}</div>
                                                                <div>Prix: {value.prixMed}Ar</div>
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
                                        <div class="mb-3">
                                            <label for="bilan" className="form-label">
                                                Quantité
                                            </label>
                                            <input type="number" id="bilan" className="form-control" value={quantite} onChange={onChangeQuantite}/>
                                        </div>
                                        <div class="mb-3">
                                            <label for="bilan" className="form-label">
                                                Mode d'utilisation
                                            </label>
                                            <input type="text" id="bilan" className="form-control" value={mode} onChange={onCHangeMode}/>
                                        </div>
                                        <button className="btn btn-primary" disabled = {!validatedMed} type="onSubmit">Ajouter</button>
                                    </form>
                                </p>
                            </div>
                            <div className="card-footer">
                                <ol class="list-group list-group-numbered">
                                    {medicament && medicament.map((value) => {
                                        return (
                                            <li className="list-group-item d-flex justify-content-between align-items-start" key={value.idMed}>
                                                <div className="ms-2 me-auto">
                                                    <div className="fw-bold">{value.nomMed}</div>
                                                    <div>Quantité: {value.qtMed}</div>
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