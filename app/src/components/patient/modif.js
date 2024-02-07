import React, { useContext, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { UserContext } from "../../hooks/contextPatient";
const { ipcRenderer } = require('electron');

function ModifPatient() {
    const {idUser} = useContext(UserContext)
    const navigate = useNavigate();
    const [patientInfo, setPatientInfo] = useState({
        name: '',
        age: '',
        sexe: ''
    })

    const onSubmit = (e)=>{
        e.preventDefault();
        ipcRenderer.send('modif-patient', { value1: patientInfo.name, value2: patientInfo.age, value3: patientInfo.sexe, value4: idUser });
        navigate('/patient/detail')
    }
    useEffect(() => {
        console.log(idUser);
        ipcRenderer.send('select-data', `SELECT * FROM Patients WHERE idPtn = ${idUser}`);
        ipcRenderer.on('select-data-reply', (event, response) => {
            setPatientInfo({
                name : response[0].namePtn,
                age: response[0].agePtnv,
                sexe: response[0].sexePtn
            })
        }, []);
    }, [idUser]);
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
                            <button type="submit" className="btn btn-primary"><i className="bi bi-person-plus-fill"></i>{' '}Modifier</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModifPatient

