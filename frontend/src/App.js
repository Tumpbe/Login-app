import { Route, Routes } from 'react-router';

import './App.css';
import { Login } from './components/Login';
import { Register } from './components/Register';

function App() {
  return (
    <>
    <Routes>
      <Route path="/register" element={<Register/>}/>
    </Routes>
    </>
  );
}

export default App;
