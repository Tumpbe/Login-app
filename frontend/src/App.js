import './App.css';
import { Login } from './components/Login';
import { Register } from './components/Register';

const addUser = (name, email, password, passwordConfirm, e) => {
  /* TODO
  add new user
  ... POST request to users database (/api/users)
  */
}

function App() {
  return (
    <>
    <Register handleSubmit={addUser}></Register>
    </>
  );
}

export default App;
