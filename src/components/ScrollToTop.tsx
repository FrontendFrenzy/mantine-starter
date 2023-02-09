import { Affix, Box, Center, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { IconArrowUp } from '@tabler/icons';

export default function ScrollToTop() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Transition transition="scale" mounted={scroll.y > 0}>
        {(transitionStyles) => (
          <Box
            style={transitionStyles}
            onClick={() => scrollTo({ y: 0 })}
            sx={(theme) => ({
              height: 30,
              width: 30,
              background: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark,
              color: theme.colorScheme === 'light' ? theme.white : theme.colors.dark,
              borderRadius: theme.radius.xl,
              cursor: 'pointer',
            })}
          >
            <Center h="100%">
              <IconArrowUp size={16} />
            </Center>
          </Box>
        )}
      </Transition>
    </Affix>
  );
}
