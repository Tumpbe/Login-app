import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAsyncEffect } from 'use-async-effect'
import axios from "axios";

export const Profile = () => {
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('')
  const [ user, setUser ] = useState(undefined);
  const [passwordChangeVisible, setPasswordChangeVisible] = useState(false);
  const [newPassword ,setNewPassword] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();
  
  useAsyncEffect(async () => {
    try{
      const res = await axios.get(`http://localhost:3001/api/user/${id}`, {withCredentials: true});
      const { payload } = res.data;
      setSuccessMsg('Nice login successful')
    } catch (err) {
      setErrMsg('You are not authenticated, please log in');
    }
  }, [])

  const changePassword = async () => {
    try {
      const res = await axios.put(`http://localhost:3001/api/user/${id}`, {password: newPassword});

    } catch (err) {
      
    }
  }

  const deleteUser = async () => {
    try {
      const res = await axios.delete(`http://localhost:3001/api/user/${id}`);
      navigate('/');
    } catch (err) {
      if (err.response) {
        setErrMsg(err.response.data.msg);
        }
      }
  }
  
  const logoutUser = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/user/logout', {withCredentials: true});
      navigate('/');
    } catch (err) {
      if (err.response) {
        setErrMsg(err.response.data.msg);
        }
    }
  }

  return (
    errMsg? <div>{errMsg} 
      <Link style={{"marginLeft": 100}} to={"/"}>Back to home</Link></div>: 
    successMsg? 
      <div>{successMsg}
        <button onClick={() => setPasswordChangeVisible(true)}>Change password</button>
        { passwordChangeVisible ?
          <form onSubmit={changePassword}>
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