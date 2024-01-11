import './App.css';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Patient from './components/patient/Patient';
import Medic from './components/medicament/Medicament';
import AddMedic from './components/medicament/add';
import Fact from './components/Fact';
import AddPatient from './components/patient/add';
import DetailPatient from './components/patient/detail';


function App() {
  return (
    <Sidebar >
      <Routes>
        <Route path='/' element={<Dashboard />}/>
        <Route path='/patient' element={<Patient />} />
        <Route path='/patient/addPatient' element={<AddPatient />} />
        <Route path='/patient/detail' element={<DetailPatient />} />
        <Route path='/medic' element={<Medic />} />
        <Route path='/medic/addMedic' element={<AddMedic />} />
        <Route path='/fact' element={<Fact />} />
      </Routes>
    </Sidebar>
  );
}

export default App;
