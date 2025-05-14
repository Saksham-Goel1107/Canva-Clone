import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

import { client } from '@/lib/hono';

type RequestType = InferRequestType<(typeof client.api.projects)[':id']['$delete']>['param'];
type ResponseType = InferResponseType<(typeof client.api.projects)[':id']['$delete'], 200>;

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (param) => {
      const response = await client.api.projects[':id'].$delete({
        param,
      });

      if (!response.ok) {
        throw new Error(response.statusText ?? 'An unknown error occured.');
      }

      return await response.json();
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({
        queryKey: ['projects'],
      });

      queryClient.invalidateQueries({
        queryKey: ['project', id],
      });
    },
    onError: (error) => {
      toast.error('Failed to delete project!', {
        description: error.message,
      });
    },
  });

  return mutation;
};
