import {
  Box,
  Button,
  Center,
  Group,
  Loader,
  Space,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useAuth } from '../context/AuthContext';
import useServerData from '../hooks/useServerData';
import SystemUsageTable from '../components/SystemUsageGrid';
import AppHeader from '../components/AppHeader';

export default function Home() {
  const { signedInUser } = useAuth();

  const { assignedUsers, fetchSystemUsageData, loading, lastRefreshTime } =
    useServerData();

  return (
    <>
      <Stack h="100vh">
        <AppHeader />

        <Box px={24}>
          <Group justify="space-between">
            <Title order={3}>
              Welcome, {signedInUser?.firstName} {signedInUser?.surname}
            </Title>
            <div>
              <Button disabled={loading} onClick={fetchSystemUsageData}>
                Refresh
              </Button>
              <Text>Last refreshed: {lastRefreshTime ?? 'N/A'}</Text>
            </div>
          </Group>

          <Space h="lg" />

          {loading ? (
            <Center>
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
    </>
  );
}
