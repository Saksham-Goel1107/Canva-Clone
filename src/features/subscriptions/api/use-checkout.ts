import { useMutation } from '@tanstack/react-query';
import { InferResponseType } from 'hono';
import { toast } from 'sonner';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<(typeof client.api.subscriptions.checkout)['$post'], 200>;

export const useCheckout = () => {
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.subscriptions.checkout.$post();

      if (!response.ok) {
        throw new Error(response.statusText ?? 'An unknown error occured.');
      }

      return await response.json();
    },
    onSuccess: (url) => {
      window.location.href = url;
    },
    onError: (error) => {
      toast.error('Something went wrong!', {
        description: error.message,
      });
    },
  });

  return mutation;
};
