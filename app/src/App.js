import './App.css';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Patient from './components/patient/Patient';
import Medic from './components/medicament/Medicament';
import AddMedic from './components/medicament/add';
import Fact from './components/ordonnance/Fact';
import AddPatient from './components/patient/add';
import DetailPatient from './components/patient/detail';
import CreateFact from './components/ordonnance/add';
import ModifPatient from './components/patient/modif';
import DetailMed from './components/medicament/detail';
import ModifMedic from './components/medicament/modif';
import PDFViewer from './components/ordonnance/pdfViewer';


function App() {
  return (
    <Sidebar >
      <Routes>
        <Route path='/' element={<Dashboard />}/>
        <Route path='/patient' element={<Patient />} />
        <Route path='/patient/addPatient' element={<AddPatient />} />
        <Route path='/patient/detail' element={<DetailPatient />} />
        <Route path='/patient/modif' element={<ModifPatient />} />
        <Route path='/medic' element={<Medic />} />
        <Route path='/medic/addMedic' element={<AddMedic />} />
        <Route path='/medic/detail' element={<DetailMed />} />
        <Route path='/medic/modif' element={<ModifMedic />} />
        <Route path='/fact' element={<Fact />} />
        <Route path='/fact/create' element={<CreateFact />} />
        <Route path='/fact/detail' element={<PDFViewer />} />
      </Routes>
    </Sidebar>
  );
}

export default App;
