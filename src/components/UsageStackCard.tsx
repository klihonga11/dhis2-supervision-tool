import { Card, Center, Text } from '@mantine/core';
import formatDate from '../utils/formatDate';
import type { AssignedUser } from '../utils/types';

export default function UsageStackCard({ user }: { user: AssignedUser }) {
  return (
    <Card shadow="sm" padding="lg" withBorder>
      <Center>
        <Text ta="start">
          Name: {user.name}
          <br />
          Last sync date: {formatDate(user.lastSyncDate) ?? 'N/A'}
        </Text>
      </Center>
    </Card>
  );
}
