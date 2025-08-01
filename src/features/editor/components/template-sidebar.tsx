import { AlertTriangle, Crown, Loader2, Search } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { type ActiveTool, type Editor } from '@/features/editor/types';
import { type ResponseType, useGetTemplates } from '@/features/projects/api/use-get-templates';
import { usePaywall } from '@/features/subscriptions/hooks/use-paywall';
import { useConfirm } from '@/hooks/use-confirm';
import { cn } from '@/lib/utils';

import { ToolSidebarClose } from './tool-sidebar-close';
import { ToolSidebarHeader } from './tool-sidebar-header';

interface TemplateSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const TemplateSidebar = ({ editor, activeTool, onChangeActiveTool }: TemplateSidebarProps) => {
  const { shouldBlock, triggerPaywall } = usePaywall();
  const [ConfirmDialog, confirm] = useConfirm('Are you sure?', 'You are about to replace the current project with this template.');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, refetch } = useGetTemplates({
    page: currentPage.toString(),
    limit: '20',
  });

  const onClose = () => onChangeActiveTool('select');

  const onClick = async (template: ResponseType) => {
    if (template.isPro && shouldBlock) return triggerPaywall();

    const ok = await confirm();

    if (!ok) return;

    editor?.loadJSON(template.json);
  };

  const filteredTemplates = data?.filter((template) => template.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const loadMoreTemplates = () => {
    setCurrentPage((prev) => prev + 1);
    refetch();
  };

  return (
    <aside
      className={cn('relative z-40 flex h-full w-[360px] flex-col border bg-white', activeTool === 'templates' ? 'visible' : 'hidden')}
    >
      <ConfirmDialog />

      <ToolSidebarHeader title="Templates" description="Choose from a variety of templates to get started." />

      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <Search className="size-4 text-muted-foreground" />
          <Input placeholder="Search templates..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1" />
        </div>
      </div>

      {isLoading && (
        <div className="flex flex-1 items-center justify-center">
          <Loader2 className="size-4 animate-spin text-muted-foreground" />
        </div>
      )}

      {isError && (
        <div className="flex flex-1 flex-col items-center justify-center gap-y-4">
          <AlertTriangle className="size-4 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Failed to fetch templates.</p>
        </div>
      )}

      <ScrollArea>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {filteredTemplates &&
              filteredTemplates.map((template) => {
                return (
                  <button
                    key={template.id}
                    onClick={() => onClick(template)}
                    style={{
                      aspectRatio: `${template.width} / ${template.height}`,
                    }}
                    className="group relative w-full overflow-hidden rounded-sm border bg-muted transition hover:opacity-75"
                  >
                    <Image fill src={template.thumbnailUrl || ''} alt={template.name} className="object-cover" />

                    {template.isPro && (
                      <div className="absolute right-2 top-2 z-10 flex size-8 items-center justify-center rounded-full bg-black/50 shadow-md">
                        <Crown className="size-4 fill-yellow-500 text-yellow-500" />
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 w-full truncate bg-black/50 p-1 text-left text-[10px] text-white opacity-0 group-hover:opacity-100">
                      {template.name}
                    </div>
                  </button>
                );
              })}
          </div>

          {data && data.length >= 20 && (
            <div className="mt-6 flex justify-center">
              <Button variant="outline" onClick={loadMoreTemplates} disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
                Load more templates
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
