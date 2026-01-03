import { MenuItem } from './menu.model';

export const MENU_ITEMS: MenuItem[] = [
    {
    label: 'Dashboard',
    icon: 'people',
    route: '/dashboard',
    roles: ['ADMIN']
  },
  {
    label: 'Admin Users',
    icon: 'people',
    route: '/admin/users',
    roles: ['ADMIN']
  },
  {
    label: 'Doctors',
    icon: 'medical_services',
    route: '/doctors',
    roles: ['ADMIN']
  },
  {
    label: 'Patients',
    icon: 'person',
    route: '/patients',
    roles: ['ADMIN', 'DOCTOR']
  },
  {
    label: 'Appointments',
    icon: 'event',
    route: '/appointments',
    roles: ['ADMIN', 'DOCTOR']
  },
  {
    label: 'Pharmacy',
    icon: 'local_pharmacy',
    route: '/pharmacy',
    roles: ['ADMIN', 'STAFF']
  },
  {
    label: 'Billing',
    icon: 'receipt',
    route: '/billing',
    roles: ['ADMIN', 'STAFF']
  },
  {
    label: 'Discharge',
    icon: 'exit_to_app',
    route: '/discharge',
    roles: ['ADMIN', 'STAFF']
  },
  {
  label: 'Email Notifications',
  icon: 'email',
  route: '/notifications/email',
  roles: ['ADMIN']
},
{
  label: 'SMS Notifications',
  icon: 'sms',
  route: '/notifications/sms',
  roles: ['ADMIN']
}
];
