import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const Homesidebar = [
  {
    title: 'Home',
    path: '/cdash/home',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Notifications',
    path: '/cdash/notification',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Apply For Hostel',
    path: '/cdash/apply',
    icon: <FaIcons.FaWpforms />,
    cName: 'nav-text'
  },
  {
    title: 'Allotment List',
    path: '/cdash/allot',
    icon: <FaIcons.FaWpforms />,
    cName: 'nav-text'
  },

];
