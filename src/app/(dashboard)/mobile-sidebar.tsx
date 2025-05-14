'use client';

import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { MenuIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { Logo } from './logo';
import { SidebarRoutes } from './sidebar-routes';

export const MobileSidebar = () => {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const onClick = () => setOpen(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="block lg:hidden" asChild>
        <Button size="iconSm" variant="ghost">
          <MenuIcon className="size-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="flex h-full w-[300px] shrink-0 flex-col bg-muted p-0">
        <SheetHeader>
          <VisuallyHidden.Root>
            <SheetTitle>Image AI</SheetTitle>
          </VisuallyHidden.Root>

          <VisuallyHidden.Root>
            <SheetDescription>Image AI Mobile Sidebar</SheetDescription>
          </VisuallyHidden.Root>
          <Logo />
        </SheetHeader>

        <SidebarRoutes onClick={onClick} />
      </SheetContent>
    </Sheet>
  );
};
