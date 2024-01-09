import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
function Fact(){
    const [patient, setPatient] = useState()
    useEffect(()=>{
        ipcRenderer.send('select-data', 'SELECT * FROM Patients');
ipcRenderer.on('select-data-reply', (event, response) => {
  setPatient(response) // response contains rows from the database
},[]);
    },[])
    return(
        <>
            Facturation {patient}
        </>
    )
}

export default Fact;