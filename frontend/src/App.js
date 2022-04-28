import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState} from 'react';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Profile } from './components/Profile';
import styled from 'styled-components';
import './App.css';

const AppContainer = styled.div`
  margin: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: dodgerblue;
`;

const App = () => {
  const navigate = useNavigate();
  const [ user, setUser ] = useState(undefined);

  const loginCallBack = (payload) => {
    setUser(payload);
    navigate(`profile/${payload.id}`);
  }
  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<Home user={user}/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login loginCallBack={loginCallBack}/>}/>
        <Route path="/profile/:id" element={<Profile/>}/>
      </Routes>
    </AppContainer>
  );
}

export default App;
