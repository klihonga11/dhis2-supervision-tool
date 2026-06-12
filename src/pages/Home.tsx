import { Button, Text } from '@mantine/core';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <Text>Home page</Text>
      <Button onClick={handleLogout}>Log out</Button>
    </>
  );
}
