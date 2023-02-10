import {
  DehydratedState,
  Hydrate,
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ReactNode, useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorNotification } from '@/components/common/Notification';

const mutationCache = new MutationCache({
  onError: (error) => {
    if (error instanceof AxiosError) {
      ErrorNotification(error.code, error.message);
    }
  },
});

const queryCache = new QueryCache({
  onError: (error) => {
    if (error instanceof AxiosError) {
      ErrorNotification(error.code, error.message);
    }
  },
});

export default function QueryWrapper({
  dehydratedState,
  children,
}: {
  dehydratedState: DehydratedState;
  children: ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 3,
            staleTime: 30000,
            refetchInterval: false,
          },
        },
        mutationCache,
        queryCache,
      })
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>{children}</Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
