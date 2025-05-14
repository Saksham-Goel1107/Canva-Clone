import { type FileRouter, createUploadthing } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

import { auth } from '@/auth';

const f = createUploadthing();

export const appFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .middleware(async () => {
      const session = await auth();

      if (!session || !session.user) throw new UploadThingError('Unauthorized!');

      return { userId: session.user.id };
    })
    .onUploadComplete(({ file }) => {
      return { url: file.url };
    }),
} satisfies FileRouter;

export type AppFileRouter = typeof appFileRouter;
