import { Route, Routes } from 'react-router';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';
import styled from 'styled-components';
import './App.css';

const AppContainer = styled.div`
  font-family: "Open Sans", sans-serif;
  margin: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: dodgerblue;
`

const App = () => {

  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </AppContainer>
  );
}

export default App;
