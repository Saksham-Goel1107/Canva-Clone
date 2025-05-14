import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { type ActiveTool, type Editor, STROKE_COLOR, STROKE_WIDTH } from '@/features/editor/types';
import { cn } from '@/lib/utils';

import { ColorPicker } from './color-picker';
import { ToolSidebarClose } from './tool-sidebar-close';
import { ToolSidebarHeader } from './tool-sidebar-header';

interface DrawSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const DrawSidebar = ({ editor, activeTool, onChangeActiveTool }: DrawSidebarProps) => {
  const color = editor?.getActiveStrokeColor() || STROKE_COLOR;
  const width = editor?.getActiveStrokeWidth() || STROKE_WIDTH;

  const onClose = () => {
    editor?.disableDrawingMode();
    onChangeActiveTool('select');
  };

  const onColorChange = (color: string) => {
    editor?.changeStrokeColor(color);
  };

  const onWidthChange = (width: number) => {
    editor?.changeStrokeWidth(width);
  };

  return (
    <aside className={cn('relative z-40 flex h-full w-[360px] flex-col border bg-white', activeTool === 'draw' ? 'visible' : 'hidden')}>
      <ToolSidebarHeader title="Drawing mode" description="Modify brush settings." />

      <ScrollArea>
        <div className="space-y-6 border-b p-4">
          <Label className="text-sm">Brush width</Label>

          <Slider value={[width]} onValueChange={(values) => onWidthChange(values[0])} />
        </div>

        <div className="space-y-6 p-4">
          <ColorPicker color={color} onChange={onColorChange} />
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
