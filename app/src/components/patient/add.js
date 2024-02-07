import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
const { ipcRenderer } = require('electron');

function AddPatient() {
    const navigate = useNavigate();
    const [patientInfo, setPatientInfo] = useState({
        name: '',
        age: '',
        sexe: '',
        validNamePtn: true
    })
    useEffect(()=>{
        const addPatient = (event, response) =>{
            if(response.find((value)=>value.patientStatus == 'true')){
                setPatientInfo({...patientInfo, validNamePtn: false})
            } else{
                if((patientInfo.name && patientInfo.age && patientInfo.sexe) !== ""){
                    
                    ipcRenderer.send('insert-patient', { value1: patientInfo.name, value2: patientInfo.age, value3: patientInfo.sexe });
                    navigate('/patient')
                }
            }
        }
        ipcRenderer.on('select-data-reply', addPatient);
        return ()=>{
            ipcRenderer.removeListener('select-data-reply', addPatient);
        }
    },[patientInfo.name, patientInfo.age, patientInfo.sexe])

    const onSubmit = (e)=>{
        e.preventDefault();
        ipcRenderer.send('select-data', "SELECT namePtn, CASE WHEN LOWER(namePtn) = ? THEN 'true' ELSE 'false' END AS patientStatus FROM Patients", [patientInfo.name.toLowerCase()]);
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
                                <input type="text" value={patientInfo.name} onChange={(e)=>{setPatientInfo({...patientInfo, name: e.target.value})}} style={{ color: !patientInfo.validNamePtn ? 'red' : 'black' }} className="form-control" id="nomPatient" aria-describedby="emailHelp" />
                                {
                                    !patientInfo.validNamePtn && 
                                    <div style={{ color: 'red' }}>
                                        Patient déja existé
                                    </div>
                                }
                            </div>
                            <div className="mb-3">
                                <label htmlFor="agePatient" className="form-label">Age</label>
                                <input type="number" onChange={(e)=>{setPatientInfo({...patientInfo, age: e.target.value})}} value={patientInfo.age} className="form-control" id="agePatient " />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Sexe</label>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="sexe" value="Homme" checked={patientInfo.sexe === "Homme"} onChange={(e)=>{setPatientInfo({...patientInfo, sexe: e.target.value})}} id="flexRadioDefault1" />
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        Homme
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="sexe" value="Femme" checked={patientInfo.sexe === "Femme"} onChange={(e)=>{setPatientInfo({...patientInfo, sexe: e.target.value})}} id="flexRadioDefault2" />
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