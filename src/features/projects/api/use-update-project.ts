import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

import { client } from '@/lib/hono';

type RequestType = InferRequestType<(typeof client.api.projects)[':id']['$patch']>['json'];
type ResponseType = InferResponseType<(typeof client.api.projects)[':id']['$patch'], 200>;

export const useUpdateProject = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ['project', id],
    mutationFn: async (json) => {
      const response = await client.api.projects[':id'].$patch({
        json,
        param: {
          id,
        },
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

      queryClient.invalidateQueries({
        queryKey: ['project', id],
      });
    },
    onError: (error) => {
      toast.error('Failed to update project!', {
        description: error.message,
      });
    },
  });

  return mutation;
};
