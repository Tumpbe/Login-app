import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
`;

const AuthButtons = styled.button`
  width: 200px;
  padding: 20px;
  margin: 13px 0 13px 13px;
  background-color: lightskyblue;
  color: #fff;
  font-size: 25px;
  font-family: Helvetica;
  text-shadow: 1px 1px black;
  border-radius: 25px;
  &:hover {
    background-color: #4CAF50; /* Green */
  }
  cursor: pointer;
`;

export const Home = ({user}) => {
  const navigate = useNavigate();
  return (
    <>
      <ButtonGroup>
        <AuthButtons onClick={() => navigate('/login')}>Login</AuthButtons>
        <AuthButtons onClick={() => navigate('/register')}>Register</AuthButtons>
        {user && <AuthButtons onClick={() => navigate(`/profile/${user.id}`)}>Profile</AuthButtons>}
      </ButtonGroup>
    </>
  )
}