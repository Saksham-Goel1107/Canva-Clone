import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

import { client } from '@/lib/hono';

type RequestType = InferRequestType<(typeof client.api.projects)['$post']>['json'];
type ResponseType = InferResponseType<(typeof client.api.projects)['$post'], 200>;

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.projects.$post({ json });

      if (!response.ok) {
        throw new Error(response.statusText ?? 'An unknown error occured.');
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success('Project created!');

      queryClient.invalidateQueries({
        queryKey: ['projects'],
      });
    },
    onError: (error) => {
      toast.error('Something went wrong!', {
        description: error.message,
      });
    },
  });

  return mutation;
};
