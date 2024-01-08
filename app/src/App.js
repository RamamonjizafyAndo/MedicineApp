import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Patient from './components/Patient';
import Medic from './components/Medicament';
import Fact from './components/Fact';

function App() {
  return (
    <Sidebar >
      <Routes>
        <Route path='/' element={<Dashboard />}/>
        <Route path='/patient' element={<Patient />} />
        <Route path='/medic' element={<Medic />} />
        <Route path='/fact' element={<Fact />} />
      </Routes>
    </Sidebar>
  );
}

export default App;
