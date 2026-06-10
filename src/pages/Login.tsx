import {
  Container,
  Paper,
  TextInput,
  PasswordInput,
  Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  type LoginFormValues = {
    username: string;
    password: string;
  };

  const navigate = useNavigate();
  const form = useForm({
    mode: 'controlled',
    initialValues: { username: '', password: '' },
  });

  // logs the user into the system
  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const { username, password } = values;
      console.log(`${username}, ${password}`);

      const response = await fetch('/api/me', {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      });

      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      const user = await response.json();
      console.log(user);
      navigate('/home');
    } catch (error) {
      console.log('Failed to login.', error);
    }
  };

  return (
    <Container size={420} my={40} fluid>
      <Paper shadow="md" p={22} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            key={form.key('username')}
            {...form.getInputProps('username')}
            label="Username"
            required
            radius="md"
          />
          <PasswordInput
            key={form.key('password')}
            {...form.getInputProps('password')}
            label="Password"
            required
            mt="md"
            radius="md"
          />
          <Button fullWidth mt="xl" radius="md" type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
