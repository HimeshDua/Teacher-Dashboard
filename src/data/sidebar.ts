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
    name: 'Himesh',
    email: 'himeshdua22gmail.com',
    avatar: '/avatars/icon.jpg'
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
