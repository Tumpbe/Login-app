import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAsyncEffect } from 'use-async-effect'
import axios from "axios";

export const Profile = () => {
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [authSuccessMsg, setAuthSuccessMsg] = useState('');
  const [authErrMsg, setAuthErrMsg] = useState('');
  const [passwordChangeVisible, setPasswordChangeVisible] = useState(false);
  const [password, setPassword ] = useState('');
  const [newPassword ,setNewPassword] = useState('');

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
      return false;
    } else if (!passwordRegex.test(newPassword)) {
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
          setSuccessMsg('Password changed');
      } catch (err) {
        if (err.response) {
          setErrMsg(err.response.data.error);
          }
      }
    }
    else {
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
        <button onClick={() => setPasswordChangeVisible(true)}>Change password</button>
        { passwordChangeVisible ?
          <form onSubmit={changePassword}>
            <input type="password" placeholder="Enter current password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
            <input type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required></input>
            <button type="submit">Change password</button>
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