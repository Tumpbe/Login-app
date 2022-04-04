import { useState } from "react"

export const Register = ({ handleSubmit }) => {
  const [name, setName ] = useState('');
  const [email, setEmail ] = useState('');
  const [password, setPassword ] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  return (
    <form onSubmit={(e) => handleSubmit(name, email, password, passwordConfirm, e)}>
      <input ></input>
      <input ></input>
      <input ></input>
      <input ></input>
    </form>
  )
}