import {
  Container,
  Button,
  Text,
  Group,
  Modal,
  Space,
  Title,
} from '@mantine/core';
import classes from '../css/HeaderSimple.module.css';
import { useDisclosure } from '@mantine/hooks';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AppHeader() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <header className={classes.header}>
        <Container size="md" className={classes.inner}>
          <Text style={{ color: 'white' }}>Home page</Text>
          <Button variant="light" onClick={open}>
            Log out
          </Button>
        </Container>
      </header>

      <Modal opened={opened} onClose={close} withCloseButton={false}>
        <Title order={3}>Log out</Title>
        <Text>Are you sure you want to log out?</Text>
        <Space h="lg" />
        <Group>
          <Button variant="outline" onClick={close}>
            No
          </Button>
          <Button onClick={handleLogout}>Yes</Button>
        </Group>
      </Modal>
    </>
  );
}
