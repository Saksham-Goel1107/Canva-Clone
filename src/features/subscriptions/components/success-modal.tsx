'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useSuccessModal } from '@/features/subscriptions/store/use-success-modal';

export const SuccessModal = () => {
  const router = useRouter();
  const { isOpen, onClose } = useSuccessModal();

  const handleClose = () => {
    router.replace('/');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader className="flex items-center space-y-4">
          <Image src="/logo.svg" alt="Image AI" width={36} height={36} />

          <DialogTitle className="text-center">Subscription Successfull</DialogTitle>

          <DialogDescription className="text-center">You have successfully subscribed to our service.</DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4 gap-y-2 pt-2">
          <Button onClick={handleClose} className="w-full">
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
