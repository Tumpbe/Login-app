import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useAsyncEffect } from 'use-async-effect'
import axios from "axios";

export const Profile = () => {
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('')
  const [ user, setUser ] = useState(undefined);

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
  return (
    errMsg? <div>{errMsg} 
      <Link style={{"marginLeft": 100}} to={"/"}>Back to home</Link></div>: 
    successMsg? <div>{successMsg}
      <Link style={{"marginLeft": 100}} to={"/"}>Back to home</Link></div>:
    <div></div>
  )
}