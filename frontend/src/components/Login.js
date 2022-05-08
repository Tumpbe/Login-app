import { useState } from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from "axios";

const AuthBox = styled.div`
  display: flex;
  justify-content: center;
  height: 475px;
  width: 500px;
  padding-top: 30px;
  border-radius: 60px;
  box-shadow: 11px 12px 13px 12px;
  background-color: whitesmoke;
`;

const Title = styled.h1`
  margin-left: 65px;
  font-family: serif;
  font-size: 30px;
  padding-bottom: 20px;
  text-shadow: 1px 1px grey;
`;

const InputDiv = styled.input`
  width: 300px;
  height: 50px;
  border-radius: 60px;
  text-align: center;
  box-shadow: inset 0px 0px 25px 0px #888;
  border: none;
`;

const InputButton = styled.button`
  width: 180px;
  height: 40px;
  margin-left: 60px;
  border-radius: 60px;
  background-color: firebrick;
  font-size: 25px;
  text-shadow: 2px 2px black;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: darkred
  }
`;

export const Login = ({loginCallBack}) => {
  const [email, setEmail ] = useState('');
  const [password, setPassword ] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/login", 
      {
        email: email,
        password: password,
      }, 
      {withCredentials: true}
      );

      const { payload } = res.data;
      loginCallBack(payload);
    }
    catch (err) {
      if (err.response) {
        setErrMsg(err.response.data.error);
      }
    }
  }
  return (
    <AuthBox>
      <form onSubmit={loginSubmit}>
        <Title>Login page</Title>
        <div>{errMsg}</div>
        <div style={{"paddingBottom": 20}}>
          <InputDiv type="text" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>
        <div style={{"paddingBottom": 20}}>
          <InputDiv type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        <div style={{"paddingBottom": 20}}>
          <InputButton type="submit">Login</InputButton>
        </div>
        <div>
          <Link style={{"marginLeft": 100}} to={"/"}>Back to home</Link>
        </div>
      </form>
    </AuthBox>
  )
}