'use client';

import { useMutationState } from '@tanstack/react-query';
import { ChevronDown, Download, Loader2, MousePointerClick, Redo2, Undo2 } from 'lucide-react';
import { BsCloudCheck, BsCloudSlash, BsFileImage, BsFiletypeJpg, BsFiletypePng } from 'react-icons/bs';
import { CiFileOn } from 'react-icons/ci';
import { LuFileJson } from 'react-icons/lu';
import { useFilePicker } from 'use-file-picker';

import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { UserButton } from '@/features/auth/components/user-button';
import type { ActiveTool, Editor } from '@/features/editor/types';
import { useRenameProjectModal } from '@/features/projects/store/use-rename-project-modal';

import { Logo } from './logo';

interface NavbarProps {
  id: string;
  title: string;
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Navbar = ({ id, title, editor, activeTool, onChangeActiveTool }: NavbarProps) => {
  const { onOpen } = useRenameProjectModal();
  const data = useMutationState({
    filters: {
      mutationKey: ['project', id],
      exact: true,
    },
    select: (mutation) => mutation.state.status,
  });

  const currentStatus = data[data.length - 1];

  const isError = currentStatus === 'error';
  const isPending = currentStatus === 'pending';

  const { openFilePicker } = useFilePicker({
    accept: '.json',
    onFilesSuccessfullySelected: ({ plainFiles }: any) => {
      if (plainFiles && plainFiles.length > 0) {
        const file = plainFiles[0];
        const reader = new FileReader();

        reader.readAsText(file, 'UTF-8');
        reader.onload = () => {
          editor?.loadJSON(reader.result as string);
        };
      }
    },
  });

  return (
    <nav className="flex h-[68px] w-full items-center gap-x-8 border-b p-4 lg:pl-[34px]">
      <Logo />

      <div className="flex size-full items-center gap-x-1">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
              File
              <ChevronDown className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="min-w-60">
            <DropdownMenuItem onClick={openFilePicker} className="flex items-center gap-x-2">
              <CiFileOn className="size-8" />

              <div>
                <p>Open</p>
                <p className="text-xs text-muted-foreground">Open a JSON file.</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="mx-2" />

        <Hint label="Select" side="bottom" sideOffset={10}>
          <Button variant={activeTool === 'select' ? 'secondary' : 'ghost'} size="icon" onClick={() => onChangeActiveTool('select')}>
            <MousePointerClick className="size-4" />
          </Button>
        </Hint>

        <Hint label="Undo" side="bottom" sideOffset={10}>
          <Button disabled={!editor?.canUndo()} variant="ghost" size="icon" onClick={() => editor?.onUndo()}>
            <Undo2 className="size-4" />
          </Button>
        </Hint>

        <Hint label="Redo" side="bottom" sideOffset={10}>
          <Button disabled={!editor?.canRedo()} variant="ghost" size="icon" onClick={() => editor?.onRedo()}>
            <Redo2 className="size-4" />
          </Button>
        </Hint>

        <Separator orientation="vertical" className="mx-2" />

        {isPending && (
          <div className="flex items-center gap-x-2">
            <Loader2 className="size-4 animate-spin text-muted-foreground" />

            <p className="text-xs text-muted-foreground">Saving...</p>
          </div>
        )}

        {!isPending && isError && (
          <div className="flex items-center gap-x-2">
            <BsCloudSlash className="size-[20px] text-muted-foreground" />

            <p className="text-xs text-muted-foreground">Failed to save.</p>
          </div>
        )}

        {!isPending && !isError && (
          <div className="flex items-center gap-x-2">
            <BsCloudCheck className="size-[20px] text-muted-foreground" />

            <p className="text-xs text-muted-foreground">Saved</p>
          </div>
        )}

        <div className="ml-auto flex h-full items-center gap-x-4">
          <Button variant="ghost" size="sm" onClick={() => onOpen(id, title)}>
            {title}
          </Button>

          <Separator orientation="vertical" />

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                Export
                <Download className="ml-2 size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="min-w-60">
              <DropdownMenuItem onClick={() => editor?.saveJSON()} className="flex items-center gap-x-2">
                <LuFileJson className="size-7 text-slate-700" />

                <div>
                  <p>JSON</p>
                  <p className="text-xs text-muted-foreground">Save for later editing</p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => editor?.savePNG()} className="flex items-center gap-x-2">
                <BsFiletypePng className="size-7 text-slate-700" />

                <div>
                  <p>PNG</p>
                  <p className="text-xs text-muted-foreground">Best for editing.</p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => editor?.saveJPG()} className="flex items-center gap-x-2">
                <BsFiletypeJpg className="size-7 text-slate-700" />

                <div>
                  <p>JPG</p>
                  <p className="text-xs text-muted-foreground">Best for printing.</p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => editor?.saveJPEG()} className="flex items-center gap-x-2">
                <BsFileImage className="size-7 text-slate-700" />

                <div>
                  <p>JPEG</p>
                  <p className="text-xs text-muted-foreground">Best for sharing on the web.</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <UserButton />
        </div>
      </div>
    </nav>
  );
};
