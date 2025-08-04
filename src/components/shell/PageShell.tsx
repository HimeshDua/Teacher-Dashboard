'use client';
import {SearchProvider} from '@/context/search-context';
import {ThemeProvider} from 'next-themes';
import {AppSidebar} from '@/components/app-sidebar';

import React from 'react';
import {SiteHeader} from '@/components/site-header';
import {SidebarInset, SidebarProvider} from '@/components/ui/sidebar';

function PageShell({children}: {children: React.ReactNode}) {
  return (
    <>
      <SearchProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarProvider
            style={
              {
                '--sidebar-width': 'calc(var(--spacing) * 72)',
                '--header-height': 'calc(var(--spacing) * 12)'
              } as React.CSSProperties
            }
          >
            <AppSidebar variant="inset" />
            <SidebarInset>
              <SiteHeader />
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  {children}
                </div>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </SearchProvider>
    </>
  );
}

export default PageShell;
