import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const Sidebardata = [
  {
    title: 'Home',
    path: '/adash/home',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Profile',
    path: '/adash/profile',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Post Notice',
    path: '/adash/notice',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Applications',
    path: '/adash/applications',
    icon: <FaIcons.FaWpforms />,
    cName: 'nav-text'
  },
  {
    title: 'Manage Manager',
    path: '/adash/manager/',
    icon: <FaIcons.FaWpforms />,
    cName: 'nav-text'
  },
  // {
  //   title: 'Manage Rooms',
  //   path: '/adash/rooms',
  //   icon: <FaIcons.FaWpforms />,
  //   cName: 'nav-text'
  // },

];
