'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { useCancelModal } from '@/features/subscriptions/store/use-cancel-modal';
import { useSuccessModal } from '@/features/subscriptions/store/use-success-modal';

export const SubscriptionAlert = () => {
  const params = useSearchParams();
  const { onOpen: onOpenCancel } = useCancelModal();
  const { onOpen: onOpenSuccess } = useSuccessModal();

  const canceled = params.get('canceled');
  const success = params.get('success');

  useEffect(() => {
    if (canceled) onOpenCancel();
  }, [canceled, onOpenCancel]);

  useEffect(() => {
    if (success) onOpenSuccess();
  }, [success, onOpenSuccess]);

  return null;
};
