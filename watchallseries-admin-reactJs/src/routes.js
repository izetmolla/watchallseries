import React from 'react';




const Dashboard = React.lazy(() => import('./views/pages/dashboard/Dashboard'));

// serials
const AllSerials = React.lazy(() => import('./views/pages/serials/allserials'));
const AddNewSerial = React.lazy(() => import('./views/pages/serials/addnew'));
const ImportSerial = React.lazy(() => import('./views/pages/serials/import'));
const EditSerial = React.lazy(() => import('./views/pages/serials/editserial'));

const GeneralSettings = React.lazy(() => import('./views/pages/settings/general'));
const Importing = React.lazy(() => import('./views/pages/settings/importing'));
const ImportEpisodes = React.lazy(() => import('./views/pages/serials/import/ImportEpisodes'));






const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/serials', name: 'All Serials', exact: true, component: AllSerials },
  { path: '/serials/all', name: 'All Serials', component: AllSerials },
  { path: '/serials/addnew', name: 'Add New Serials', component: AddNewSerial },
  { path: '/serials/import', name: 'Import Serials', exact: true, component: ImportSerial },


  { path: '/serials/import/serie/:slug', name: 'Import Episodes', component: ImportEpisodes },

  { path: '/serials/edit/:id', name: 'All Serials', component: EditSerial },



  { path: '/settings', name: 'General Settings', exact: true, component: GeneralSettings },
  { path: '/settings/general', name: 'General Settings', component: GeneralSettings },
  { path: '/settings/importing', name: 'Importing Settings', component: Importing },
];

export default routes;
