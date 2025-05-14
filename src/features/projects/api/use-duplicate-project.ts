import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

import { client } from '@/lib/hono';

type RequestType = InferRequestType<(typeof client.api.projects)[':id']['duplicate']['$post']>['param'];
type ResponseType = InferResponseType<(typeof client.api.projects)[':id']['duplicate']['$post'], 200>;

export const useDuplicateProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (param) => {
      const response = await client.api.projects[':id'].duplicate.$post({
        param,
      });

      if (!response.ok) {
        throw new Error(response.statusText ?? 'An unknown error occured.');
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects'],
      });
    },
    onError: (error) => {
      toast.error('Failed to duplicate project!', {
        description: error.message,
      });
    },
  });

  return mutation;
};
