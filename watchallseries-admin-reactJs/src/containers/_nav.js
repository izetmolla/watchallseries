export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer'
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Serials',
    route: '/serials',
    icon: 'cil-layers',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All Serials',
        to: '/serials/all',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New',
        to: '/serials/addnew',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Import',
        to: '/serials/import',
      }
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Settings',
    route: '/settings',
    icon: 'cil-settings',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'General',
        to: '/settings/general',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Importing',
        to: '/settings/importing',
      }
    ],
  },



]

