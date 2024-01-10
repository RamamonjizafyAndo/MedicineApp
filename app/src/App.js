import './App.css';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Patient from './components/patient/Patient';
import Medic from './components/medicament/Medicament';
import addMedic from './components/medicament/add';
import Fact from './components/Fact';
import { useEffect } from 'react';
import AddPatient from './components/patient/add';


function App() {
  return (
    <Sidebar >
      <Routes>
        <Route path='/' element={<Dashboard />}/>
        <Route path='/patient' element={<Patient />} />
        <Route path='/addPatient' element={<AddPatient />} />
        <Route path='/medic' element={<Medic />} />
        <Route path='/addMedic' element={<addMedic />} />
        <Route path='/fact' element={<Fact />} />
      </Routes>
    </Sidebar>
  );
}

export default App;
