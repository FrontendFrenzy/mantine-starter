import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';
import { capitalizeWords } from '@/helper';

export const SuccessNotification = (msg: string) =>
  showNotification({
    autoClose: 5000,
    title: 'Success!',
    message: capitalizeWords(msg),
    icon: <IconCheck />,
    color: 'teal',
  });

export const ErrorNotification = (code: string | undefined, msg: string) =>
  showNotification({
    autoClose: 5000,
    title: code,
    message: msg,
    icon: <IconX />,
    color: 'red',
  });
