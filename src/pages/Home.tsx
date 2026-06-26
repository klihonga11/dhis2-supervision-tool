import {
  Box,
  Button,
  Center,
  Container,
  Group,
  Loader,
  Modal,
  Space,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import classes from '../css/HeaderSimple.module.css';
import { useDisclosure } from '@mantine/hooks';
import useServerData from '../hooks/useServerData';
import SystemUsageTable from '../components/SystemUsageTable';

export default function Home() {
  const { logout, signedInUser } = useAuth();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const { assignedUsers, fetchSystemUsageData, loading } = useServerData();

  return (
    <>
      <Stack h="100vh">
        <header className={classes.header}>
          <Container size="md" className={classes.inner}>
            <Text style={{ color: 'white' }}>Home page</Text>
            <Button variant="light" onClick={open}>
              Log out
            </Button>
          </Container>
        </header>

        <Box px={24}>
          <Group>
            <Text>
              Welcome, {signedInUser?.firstName} {signedInUser?.surname}
            </Text>
            <Button onClick={fetchSystemUsageData}>Refresh</Button>
          </Group>

          <Space h="lg" />

          {loading ? (
            <Center h="100vh">
              <div>
                <Loader />
                <Text>Loading system usage data. Please wait...</Text>
              </div>
            </Center>
          ) : (
            <SystemUsageTable users={assignedUsers}></SystemUsageTable>
          )}
        </Box>
      </Stack>

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
