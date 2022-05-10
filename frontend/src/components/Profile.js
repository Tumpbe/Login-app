import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAsyncEffect } from 'use-async-effect'
import styled from 'styled-components';
import axios from "axios";

const InputBox = styled.div`
  position: absolute;
  width: 150px;
  height: 100px;
`;

export const Profile = () => {
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [authSuccessMsg, setAuthSuccessMsg] = useState('');
  const [authErrMsg, setAuthErrMsg] = useState('');
  const [passwordChangeVisible, setPasswordChangeVisible] = useState(false);
  const [password, setPassword ] = useState('');
  const [newPassword ,setNewPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const passwordThreshold = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$";
  const passwordRegex = new RegExp(passwordThreshold);
  const navigate = useNavigate();
  const { id } = useParams();
  
  useAsyncEffect(async () => {
    try{
      const res = await axios.get(`http://localhost:3001/api/user/${id}`, {withCredentials: true});
      const { payload } = res.data;
      setAuthSuccessMsg('You are authenticated');
    } catch (err) {
      setAuthErrMsg('You are not authenticated, please log in');
    }
  }, [])

  const validateFormData = () => {
    if (newPassword.length < 10) {
      setErrMsg("Password needs to be atleast 10 characters long");
      return false;
    } else if (!passwordRegex.test(newPassword)) {
      setErrMsg("Password needs uppercase, lowercase,\nspecial character and numeric value");
      return false;
    } else if (newPassword !== passwordConfirm) {
      setErrMsg("Passwords don't match");
      return false;
    }  
    else {
      return true;
    }
  }

  const changePassword = async (e) => {
    e.preventDefault();
    if (validateFormData()) {
      try {
          await axios.put(`http://localhost:3001/api/user/${id}`, {password, newPassword}, {withCredentials: true});
          setErrMsg('');
          setSuccessMsg('Password changed');
          e.target.reset();
      } catch (err) {
        if (err.response) {
          setSuccessMsg('');
          setErrMsg(err.response.data.error);
          }
      }
    }
    else {
      setSuccessMsg('');
      setErrMsg("New password not strong enough (atleast 10 characters, number, lowercase and uppercase)");
    }
  }

  const deleteUser = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/user/${id}`, {withCredentials: true});
      navigate('/');
    } catch (err) {
      if (err.response) {
        setErrMsg(err.response.data.msg);
        }
      }
  }

  const logoutUser = async () => {
    try {
      await axios.get('http://localhost:3001/api/logout', {withCredentials: true});
      navigate('/');
    } catch (err) {
      if (err.response) {
        setErrMsg(err.response.data.msg);
      }
    }
  }

  return (
    authErrMsg? <div>{authErrMsg} 
      <Link style={{"marginLeft": 100}} to={"/"}>Back to home</Link></div>: 
    authSuccessMsg?
      <div>{authSuccessMsg}
        <div>{errMsg}</div>
        <div>{successMsg}</div>
        <button onClick={() => setPasswordChangeVisible(!passwordChangeVisible)}>Change password</button>
        { passwordChangeVisible ?
          <form onSubmit={changePassword}>
            <InputBox>
              <input type="password" placeholder="Enter current password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <input type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
              <input type="password" placeholder="Re-enter new password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required/>
              <button type="submit">Set new password</button>
            </InputBox>
          </form>
          : <div></div>
        }
        <button onClick={deleteUser}>Delete user</button>
        <button onClick={logoutUser}>Logout</button>
        <Link style={{"marginLeft": 100}} to={"/"}>Back to home</Link>
      </div>:
    <div></div>
  )
}