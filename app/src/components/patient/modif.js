import React, { useState, useEffect, useContext } from "react";
import {useNavigate} from 'react-router-dom'
import { UserContext } from "../../hooks/contextPatient";
const { ipcRenderer } = require('electron');

function ModifPatient() {
    const {idUser} = useContext(UserContext);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [sexe, setSexe] = useState('');
    const onChangeName = (e) => {
        setName(e.target.value)
    }
    useEffect(() => {
        console.log(idUser);
        ipcRenderer.send('select-data', `SELECT * FROM Patients WHERE idPtn = ${idUser}`);
        ipcRenderer.on('select-data-reply', (event, response) => {
            setName(response[0].namePtn);
            setAge(response[0].agePtn);
            setSexe(response[0].sexePtn);
        }, []);
    }, [idUser]);
    const onChangeAge = (e) => {
        setAge(e.target.value)
    }
    const onChangeSexe = (e) => {
        setSexe(e.target.value);
    }
    const onSubmit = (e)=>{
        e.preventDefault();
        ipcRenderer.send('modif-patient', { value1: name, value2: age, value3: sexe, value4: idUser });
        navigate('/patient/detail')
    }
    return (
        <>
            <p className="text-center title">
                Modification patient
            </p>
            <div className="container-fluid" >
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label htmlFor="nomPatient" className="form-label">Nom et prénoms</label>
                                <input type="text" value={name} onChange={onChangeName} className="form-control" id="nomPatient" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="agePatient" className="form-label">Age</label>
                                <input type="number" onChange={onChangeAge} value={age} className="form-control" id="agePatient " />
                            </div>
                            <div className="mb-3 form-check">
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
                            <button type="submit" className="btn btn-primary"><i className="bi bi-person-plus-fill"></i>{' '}Modifier</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModifPatient;