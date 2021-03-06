import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from "axios";

const AuthBox = styled.div`
  display: flex;
  justify-content: center;
  height: 510px;
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

export const Register = () => {
  const [email, setEmail ] = useState('');
  const [password, setPassword ] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const navigate = useNavigate();

  const validEmailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const passwordThreshold = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$";
  const emailRegex = new RegExp(validEmailRegex);
  const passwordRegex = new RegExp(passwordThreshold);

  const validateFormData = () => {
    if (password.length < 10) {
      setErrMsg("Password needs to be atleast 10 characters long");
      return false;
    } else if (password !== passwordConfirm) {
      setErrMsg("Passwords don't match");
      return false;
    } else if (!emailRegex.test(email)) {
      setErrMsg("Email is not valid. Check misspelling.");
      return false;
    } else if (!passwordRegex.test(password)) {
      setErrMsg("Password needs uppercase, lowercase,\nspecial character and numeric value");
      return false;
    } 
    else {
      return true;
    }
  }

  const registerSubmit = async (e) => {
    e.preventDefault();
    if (validateFormData()) {
      try {
        await axios.post("http://localhost:3001/api/register", {
          email: email,
          password: password,
          passwordConfirm: passwordConfirm
        });
        navigate('/');
      }
      catch (e) {
        if (e.response) {
          setErrMsg(e.response.data.msg);
        }
      }
    }
    else {
      console.log("Registering failed");
    }
  }
  return (
    <AuthBox>
      <form onSubmit={registerSubmit}>
        <Title>Register page</Title>
        <div style={{"text-align": 'center', "whiteSpace": "pre-wrap"}}>
          {errMsg}
        </div>
        <div style={{"paddingBottom": 20}}>
          <InputDiv type="text" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>
        <div style={{"paddingBottom": 20}}>
          <InputDiv type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        <div style={{"paddingBottom": 20}}>
          <InputDiv type="password" placeholder="Enter password again" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required/>
        </div>
        <div style={{"paddingBottom": 20}}>
          <InputButton type="submit">Register</InputButton>
        </div>
        <div>
          <Link style={{"marginLeft": 100}} to={"/"}>Back to home</Link>
        </div>
      </form>
    </AuthBox>
  )
}