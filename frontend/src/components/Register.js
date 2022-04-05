import { useState } from "react"
import axios from "axios"

export const Register = () => {
  const [name, setName ] = useState('');
  const [email, setEmail ] = useState('');
  const [password, setPassword ] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/users", {
        name: name,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm
      });
    }
    catch (e) {
      if (e.response) {
        setErrMsg(e.response.data.msg);
      }
    }
  }
  return (
    <form onSubmit={registerSubmit}>
      <div>{errMsg}</div>
      <input type="text" placeholder="Enter username" value={name} onChange={(e) => setName(e.target.value)} required/>
      <input type="text" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
      <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
      <input type="password" placeholder="Enter password again" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required/>
      <button type="submit">Register</button>
    </form>
  )
}