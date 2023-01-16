import { Text, Title } from '@mantine/core';
import useStyles from './Welcome.styles';

export default function Welcome() {
  const { classes } = useStyles();

  return (
    <>
      <Title className={classes.title} align="center" mt={100}>
        Managment{' '}
        <Text inherit variant="gradient" component="span">
          System
        </Text>
      </Title>
      <Text color="dimmed" align="center" size="lg" sx={{ maxWidth: 580 }} mx="auto" mt="xl">
        An employee management system is technology designed to streamline core HR services and
        improve workforce productivity. It accomplishes these goals largely by automating
        labor-intensive, administrative tasks and using analytics to drive business decisions.
      </Text>
    </>
  );
}
