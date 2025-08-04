import {
  IconCalendarEvent,
  IconChartBar,
  IconDashboard,
  IconHelp,
  IconHome,
  IconListDetails,
  IconSearch,
  IconSettings,
  IconUsers
} from '@tabler/icons-react';

export const data = {
  user: {
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    avatar: '/avatars/icon.jpg'
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: IconDashboard
    },
    {
      title: 'Class Comparison',
      url: '/comparison',
      icon: IconListDetails
    }
    // {
    //   title: 'Subject Insights',
    //   url: '/',
    //   icon: IconChartBar
    // },
    // {
    //   title: 'Student Profiles',
    //   url: '/',
    //   icon: IconUsers
    // },
    // {
    //   title: 'Parent Meeting Prep',
    //   url: '/',
    //   icon: IconCalendarEvent
    // }
  ]

  // navSecondary: [
  //   {
  //     title: 'Settings',
  //     url: '/settings',
  //     icon: IconSettings
  //   },
  //   {
  //     title: 'Help',
  //     url: '/help',
  //     icon: IconHelp
  //   },
  //   {
  //     title: 'Search',
  //     url: '/search',
  //     icon: IconSearch
  //   }
  // ]
};
