'use client';
import {SearchProvider} from '@/context/search-context';
import {ThemeProvider} from 'next-themes';
import React from 'react';

function PageShell({children}: {children: React.ReactNode}) {
  return (
    <>
      <SearchProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </SearchProvider>
    </>
  );
}

export default PageShell;
