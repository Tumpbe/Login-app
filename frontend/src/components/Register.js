import { useState } from "react"

export const Register = () => {
  const [name, setName ] = useState('');
  const [email, setEmail ] = useState('');
  const [password, setPassword ] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const registerSubmit = e => {
    e.preventDefault();
        /* TODO
    add new user
    ... POST request to users database (/api/users)
    */
  };
  return (
    <form onSubmit={registerSubmit}>
      <input type="text" placeholder="Enter username" value={name} onChange={(e) => setName(e.target.value)} required/>
      <input type="text" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
      <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
      <input type="password" placeholder="Enter password again" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required/>
      <button type="submit">Register</button>
    </form>
  )
}