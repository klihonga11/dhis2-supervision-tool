import { Modal, Title, Text } from '@mantine/core';

type Props = {
  opened: boolean;
  onClose: () => void;
  message: string | null;
};

export default function ErrorModal({ opened, onClose, message }: Props) {
  return (
    <>
      <Modal opened={opened} onClose={onClose} withCloseButton={false}>
        <Title order={3}>Error</Title>
        <Text>{message}</Text>
      </Modal>
    </>
  );
}
