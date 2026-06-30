import { SimpleGrid, Stack, Title } from '@mantine/core';
import type { AssignedUser } from '../utils/types';
import UsageStackCard from './UsageStackCard';

export default function SystemUsageTable({ users }: { users: AssignedUser[] }) {
  const doing_well = users.filter((u) => u.status === 1);
  const needs_monitoring = users.filter((u) => u.status === 2);
  const follow_up = users.filter((u) => u.status === 3);

  return (
    <SimpleGrid cols={3}>
      <Stack>
        <Title bg="green" order={4}>
          Doing Well
        </Title>
        {doing_well.map((user) => (
          <UsageStackCard key={user.id} user={user} />
        ))}
      </Stack>

      <Stack>
        <Title bg="orange" order={4}>
          Needs Monitoring
        </Title>
        {needs_monitoring.map((user) => (
          <UsageStackCard key={user.id} user={user} />
        ))}
      </Stack>

      <Stack>
        <Title bg="red" order={4}>
          Follow Up
        </Title>
        {follow_up.map((user) => (
          <UsageStackCard key={user.id} user={user} />
        ))}
      </Stack>
    </SimpleGrid>
  );
}
