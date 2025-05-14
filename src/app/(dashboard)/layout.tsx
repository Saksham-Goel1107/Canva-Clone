import type { PropsWithChildren } from 'react';

import { Navbar } from './navbar';
import { Sidebar } from './sidebar';

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full bg-muted">
      <Sidebar />

      <div className="flex h-full flex-col lg:pl-[300px]">
        <Navbar />

        <main className="flex-1 overflow-auto bg-white p-8 lg:rounded-tl-2xl">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
