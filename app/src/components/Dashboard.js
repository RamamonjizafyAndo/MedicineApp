import React, { useEffect, useState } from "react"
const { ipcRenderer } = require('electron');

function Dashboard(){
    const [test, setTest] = useState('');
    useEffect(()=>{
      ipcRenderer.send('insert-data', { value1: 'Ando', value2: 12, value3: 'male' });
    },[])
    return(<>
    Dashboardssssssss
    </>)
}

export default Dashboard;