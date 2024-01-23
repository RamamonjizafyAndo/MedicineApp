import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
const { ipcRenderer } = require('electron');

function AddPatient() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [sexe, setSexe] = useState('');
    const [validNamePtn , setValidNamePtn] = useState(true);
    useEffect(()=>{
        const addPatient = (event, response) =>{
            if(response.find((value)=>value.patientStatus == 'true')){
                setValidNamePtn(false)
            } else{
                if((name && age && sexe) !== ""){
                    
                    ipcRenderer.send('insert-patient', { value1: name, value2: age, value3: sexe });
                    navigate('/patient')
                }
            }
        }
        ipcRenderer.on('select-data-reply', addPatient);
        return ()=>{
            ipcRenderer.removeListener('select-data-reply', addPatient);
        }
    },[name, age, sexe])
    const onChangeName = (e) => {
        setName(e.target.value)
    }
    const onChangeAge = (e) => {
        setAge(e.target.value)
    }
    const onChangeSexe = (e) => {
        setSexe(e.target.value);
    }
    const onSubmit = (e)=>{
        e.preventDefault();
        ipcRenderer.send('select-data', "SELECT namePtn, CASE WHEN LOWER(namePtn) = ? THEN 'true' ELSE 'false' END AS patientStatus FROM Patients", [name.toLowerCase()]);
    }
    return (
        <>
            <p className="text-center title">
                Ajout patient
            </p>
            <div className="container-fluid" >
                <div className="card card-add">
                    <div className="card-body">
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label htmlFor="nomPatient" className="form-label">Nom et prénoms</label>
                                <input type="text" value={name} onChange={onChangeName} style={{ color: !validNamePtn ? 'red' : 'black' }} className="form-control" id="nomPatient" aria-describedby="emailHelp" />
                                {
                                    !validNamePtn && 
                                    <div style={{ color: 'red' }}>
                                        Patient déja existé
                                    </div>
                                }
                            </div>
                            <div className="mb-3">
                                <label htmlFor="agePatient" className="form-label">Age</label>
                                <input type="number" onChange={onChangeAge} value={age} className="form-control" id="agePatient " />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Sexe</label>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="sexe" value="Homme" checked={sexe === "Homme"} onChange={onChangeSexe} id="flexRadioDefault1" />
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        Homme
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="sexe" value="Femme" checked={sexe === "Femme"} onChange={onChangeSexe} id="flexRadioDefault2" />
                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                        Femme
                                    </label>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary"><i className="bi bi-person-plus-fill"></i>{' '}Ajouter</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddPatient