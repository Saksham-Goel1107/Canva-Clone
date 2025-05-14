'use client';

import type { PropsWithChildren } from 'react';

import { QueryProvider } from './query-provider';

export const Providers = ({ children }: PropsWithChildren) => {
  return <QueryProvider>{children}</QueryProvider>;
};
