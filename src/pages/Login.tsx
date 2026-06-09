import {
  Container,
  Paper,
  TextInput,
  PasswordInput,
  Button,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  return (
    <Container size={420} my={40} fluid>
      <Paper shadow="sm" p={22} mt={30} radius="md">
        <TextInput label="Username" required radius="md" />
        <PasswordInput label="Password" required mt="md" radius="md" />
        <Button fullWidth mt="xl" radius="md" onClick={() => navigate('/home')}>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
