import { FaCircle, FaSquare, FaSquareFull } from 'react-icons/fa';
import { FaDiamond } from 'react-icons/fa6';
import { IoTriangle } from 'react-icons/io5';

import { ScrollArea } from '@/components/ui/scroll-area';
import type { ActiveTool, Editor } from '@/features/editor/types';
import { cn } from '@/lib/utils';

import { ShapeTool } from './shape-tool';
import { ToolSidebarClose } from './tool-sidebar-close';
import { ToolSidebarHeader } from './tool-sidebar-header';

interface ShapeSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const ShapeSidebar = ({ editor, activeTool, onChangeActiveTool }: ShapeSidebarProps) => {
  const onClose = () => onChangeActiveTool('select');

  return (
    <aside className={cn('relative z-40 flex h-full w-[360px] flex-col border bg-white', activeTool === 'shapes' ? 'visible' : 'hidden')}>
      <ToolSidebarHeader title="Shapes" description="Add shapes to your canvas." />

      <ScrollArea>
        <div className="grid grid-cols-3 gap-4 p-4">
          <ShapeTool icon={FaCircle} onClick={() => editor?.addCircle()} />

          <ShapeTool icon={FaSquare} onClick={() => editor?.addSoftRectangle()} />

          <ShapeTool icon={FaSquareFull} onClick={() => editor?.addRectangle()} />

          <ShapeTool icon={IoTriangle} onClick={() => editor?.addTriangle()} />

          <ShapeTool icon={IoTriangle} iconClassName="rotate-180" onClick={() => editor?.addInverseTriangle()} />

          <ShapeTool icon={FaDiamond} onClick={() => editor?.addDiamond()} />
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
