import {
  Button,
  Container,
  Group,
  Modal,
  Space,
  Text,
  Title,
} from '@mantine/core';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import classes from '../css/HeaderSimple.module.css';
import { useDisclosure } from '@mantine/hooks';
import useServerData from '../hooks/useServerData';

export default function Home() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const { assignedUsers, fetchSystemUsageData } = useServerData();

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

      <Button onClick={fetchSystemUsageData}>Click Me!</Button>

      <div>
        <ul>
          {assignedUsers.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>

      <Modal opened={opened} onClose={close} withCloseButton={false}>
        <Title order={3}>Log out</Title>
        <div>Are you sure you want to log out?</div>
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
