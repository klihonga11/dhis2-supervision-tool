import { Table, Card, Text } from '@mantine/core';
import type { AssignedUser } from '../utils/types';
import formatDate from '../utils/formatDate';

export default function SystemUsageTable({ users }: { users: AssignedUser[] }) {
  const rows = users.map((user) => {
    return (
      <Table.Tr key={user.id}>
        <Table.Td ta="center"></Table.Td>
        <Table.Td ta="center"></Table.Td>
        <Table.Td ta="center">
          <Card>
            <Text>Name: {user.name}</Text>
            <Text>
              Last sync date: {formatDate(user?.lastSyncDate) ?? `N/A`}
            </Text>
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
