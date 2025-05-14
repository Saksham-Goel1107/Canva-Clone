import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { type ActiveTool, type Editor, filters } from '@/features/editor/types';
import { cn } from '@/lib/utils';

import { ToolSidebarClose } from './tool-sidebar-close';
import { ToolSidebarHeader } from './tool-sidebar-header';

interface FilterSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const FilterSidebar = ({ editor, activeTool, onChangeActiveTool }: FilterSidebarProps) => {
  const onClose = () => onChangeActiveTool('select');

  return (
    <aside className={cn('relative z-40 flex h-full w-[360px] flex-col border bg-white', activeTool === 'filter' ? 'visible' : 'hidden')}>
      <ToolSidebarHeader title="Filters" description="Apply a filter to selected image." />

      <ScrollArea>
        <div className="space-y-2 border-b p-4">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant="outline"
              size="lg"
              className="h-14 w-full justify-start text-left"
              onClick={() => editor?.changeImageFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
