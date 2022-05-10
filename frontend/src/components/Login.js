import { useState } from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from "axios";
import emailjs from 'emailjs-com';

const AuthBox = styled.div`
  display: absolute;
  justify-content: center;
  height: 475px;
  width: 500px;
  padding-top: 30px;
  border-radius: 60px;
  box-shadow: 11px 12px 13px 12px;
  background-color: whitesmoke;
`;

const Title = styled.h1`
  margin-left: 175px;
  font-family: serif;
  font-size: 30px;
  padding-bottom: 20px;
  text-shadow: 1px 1px grey;
`;

const InputDiv = styled.input`
  margin-left: 90px;
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
  margin-left: 150px;
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
  const [verificationCode, setVerificationCode] = useState('');
  const [randCode, setRandCode] = useState(undefined);
  const [codeInputVisible, setCodeInputVisible] = useState(false);

  const compareCodes = () => {
    if (randCode.toString() === verificationCode) {
      return true;
    }
    return false;
  }

  const emailVerification = async (user) => {
    const min = 1000;
    const max = 9999;
    const rand = Math.floor(min + Math.random() * (max - min));
    setRandCode(rand);

    //send random generated vertification code to user email
    // keys should be moved to .env file for security purposes
    emailjs.send('service_3b8w89c', 'template_y89b854',{from_name: 'Login-app', from_email:'loginapp.tuniproject@gmail.com', to_email: user.email, message: rand},'SLYE5Iv8A8p2jl-XY')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/login", 
      {
        email: email,
        password: password,
      },{withCredentials: true});
      const { payload } = res.data;
      setCodeInputVisible(true); // Set verification code input visible

      if (verificationCode === '') {
        setErrMsg('Please enter verification code! Check email');
        emailVerification(payload); // Send verification code
      }      
      else if (compareCodes()) {
        loginCallBack(payload);
      }
      else {
        // verification code wrong -> reset cookie
        await axios.get('http://localhost:3001/api/logout', {withCredentials: true});
        setCodeInputVisible(false);
        setVerificationCode('');
        setRandCode(undefined);
        setErrMsg('Wrong verification code! Login failed');
      }
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
        <div style={{"paddingBottom": 20, "marginLeft": 125}}>{errMsg}</div>
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
          <Link style={{"marginLeft": 190}} to={"/"}>Back to home</Link>
        </div>
      </form>
      {codeInputVisible ?
          <InputDiv style={{"marginLeft": 90}} type="text" placeholder="Enter code" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} required/>
        :
        <div></div>
      }
    </AuthBox>
  )
}