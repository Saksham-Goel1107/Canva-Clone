import type { LucideIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

export const SidebarItem = ({ icon: Icon, label, onClick, isActive }: SidebarItemProps) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn('flex aspect-video size-full flex-col rounded-none p-3 py-4', isActive && 'bg-muted text-primary')}
    >
      <Icon className="size-5 shrink-0 stroke-2" />

      <span className="mt-2 text-xs">{label}</span>
    </Button>
  );
};
