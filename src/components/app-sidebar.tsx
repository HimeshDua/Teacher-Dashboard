'use client';

import * as React from 'react';
import {
  IconCalendarEvent,
  IconChartBar,
  IconDashboard,
  IconHelp,
  IconHome,
  IconInnerShadowTop,
  IconListDetails,
  IconSearch,
  IconSettings,
  IconUsers
} from '@tabler/icons-react';

import {NavMain} from '@/components/nav-main';
import {NavSecondary} from '@/components/nav-secondary';
import {NavUser} from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';

const data = {
  user: {
    name: 'Himesh',
    email: 'himeshdua22gmail.com',
    avatar: '/avatars/shadcn.jpg'
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: IconDashboard
    },
    {
      title: 'Class Comparison',
      url: '/comparison',
      icon: IconListDetails
    },
    {
      title: 'Subject Insights',
      url: '/subjects',
      icon: IconChartBar
    },
    {
      title: 'Student Profiles',
      url: '/students',
      icon: IconUsers
    },
    {
      title: 'Parent Meeting Prep',
      url: '/prep',
      icon: IconCalendarEvent
    }
  ],
  navClasses: [
    {
      title: 'Room 201',
      icon: IconHome,
      url: '/class/201',
      items: [
        {title: 'Overview', url: '/class/201/overview'},
        {title: 'Math', url: '/class/201/math'},
        {title: 'English', url: '/class/201/english'},
        {title: 'Science', url: '/class/201/science'}
      ]
    },
    {
      title: 'Room 202',
      icon: IconHome,
      url: '/class/202',
      items: [
        {title: 'Overview', url: '/class/202/overview'},
        {title: 'Math', url: '/class/202/math'},
        {title: 'English', url: '/class/202/english'},
        {title: 'Science', url: '/class/202/science'}
      ]
    }
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '/settings',
      icon: IconSettings
    },
    {
      title: 'Help',
      url: '/help',
      icon: IconHelp
    },
    {
      title: 'Search',
      url: '/search',
      icon: IconSearch
    }
  ]
};

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Seeqlo</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
