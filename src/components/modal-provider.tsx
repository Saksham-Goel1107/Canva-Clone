'use client';

import { useEffect, useState } from 'react';

import { RenameProjectModal } from '@/features/projects/components/rename-project-modal';
import { CancelModal } from '@/features/subscriptions/components/cancel-modal';
import { SubscriptionModal } from '@/features/subscriptions/components/subscription-modal';
import { SuccessModal } from '@/features/subscriptions/components/success-modal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <RenameProjectModal />
      <CancelModal />
      <SubscriptionModal />
      <SuccessModal />
    </>
  );
};
