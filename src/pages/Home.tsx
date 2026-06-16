import { Button, Container, Text } from '@mantine/core';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import classes from '../css/HeaderSimple.module.css';

export default function Home() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <header className={classes.header}>
        <Container size="md" className={classes.inner}>
          <Text style={{ color: 'white' }}>Home page</Text>
          <Button variant="light" onClick={handleLogout}>
            Log out
          </Button>
        </Container>
      </header>
    </>
  );
}
