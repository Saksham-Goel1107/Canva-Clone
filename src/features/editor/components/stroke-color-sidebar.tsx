import { ScrollArea } from '@/components/ui/scroll-area';
import { type ActiveTool, type Editor, STROKE_COLOR } from '@/features/editor/types';
import { cn } from '@/lib/utils';

import { ColorPicker } from './color-picker';
import { ToolSidebarClose } from './tool-sidebar-close';
import { ToolSidebarHeader } from './tool-sidebar-header';

interface StrokeColorSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const StrokeColorSidebar = ({ editor, activeTool, onChangeActiveTool }: StrokeColorSidebarProps) => {
  const color = editor?.getActiveStrokeColor() || STROKE_COLOR;

  const onClose = () => onChangeActiveTool('select');

  const onChange = (color: string) => {
    editor?.changeStrokeColor(color);
  };

  return (
    <aside
      className={cn('relative z-40 flex h-full w-[360px] flex-col border bg-white', activeTool === 'stroke-color' ? 'visible' : 'hidden')}
    >
      <ToolSidebarHeader title="Stroke color" description="Add stroke color to your element." />

      <ScrollArea>
        <div className="space-y-6 p-4">
          <ColorPicker color={color} onChange={onChange} />
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
