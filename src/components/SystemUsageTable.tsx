import { Table, Card, Text, Center } from '@mantine/core';
import type { AssignedUser } from '../utils/types';
import formatDate from '../utils/formatDate';

export default function SystemUsageTable({ users }: { users: AssignedUser[] }) {
  const rows = users.map((user) => {
    return (
      <Table.Tr key={user.id}>
        <Table.Td></Table.Td>
        <Table.Td></Table.Td>
        <Table.Td>
          <Card shadow="sm" padding="lg" withBorder>
            <Center>
              <Text ta="start">
                Name: {user.name} <br />
                Last sync date: {formatDate(user?.lastSyncDate) ?? `N/A`}
              </Text>
            </Center>
          </Card>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table style={{ width: '100%', tableLayout: 'fixed' }}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th bg="green" ta="center">
            Doing well
          </Table.Th>
          <Table.Th bg="orange" ta="center">
            Needs monitoring
          </Table.Th>
          <Table.Th bg="red" ta="center">
            Follow up
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
