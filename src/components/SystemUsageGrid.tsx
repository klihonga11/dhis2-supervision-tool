import { ScrollArea, SimpleGrid, Stack, Title } from '@mantine/core';
import type { AssignedUser } from '../utils/types';
import UsageStackCard from './UsageStackCard';

export default function SystemUsageTable({ users }: { users: AssignedUser[] }) {
  const doing_well = users.filter((u) => u.status === 1);
  const needs_monitoring = users.filter((u) => u.status === 2);
  const follow_up = users.filter((u) => u.status === 3);

  return (
    <SimpleGrid cols={3}>
      <Stack h="75vh">
        <Title bg="green" order={4}>
          Doing Well
        </Title>

        <ScrollArea flex={1}>
          <Stack>
            {doing_well.map((user) => (
              <UsageStackCard key={user.id} user={user} />
            ))}
          </Stack>
        </ScrollArea>
      </Stack>

      <Stack h="75vh">
        <Title bg="orange" order={4}>
          Needs Monitoring
        </Title>

        <ScrollArea flex={1}>
          <Stack>
            {needs_monitoring.map((user) => (
              <UsageStackCard key={user.id} user={user} />
            ))}
          </Stack>
        </ScrollArea>
      </Stack>

      <Stack h="75vh">
        <Title bg="red" order={4}>
          Follow Up
        </Title>
        <ScrollArea flex={1}>
          <Stack>
            {follow_up.map((user) => (
              <UsageStackCard key={user.id} user={user} />
            ))}
          </Stack>
        </ScrollArea>
      </Stack>
    </SimpleGrid>
  );
}
