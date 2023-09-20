// assets
import { IconUsers,IconUser } from '@tabler/icons';

// constant
const icons = { IconUsers,IconUser };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'pages',
  title: 'Genel',
  // caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Kullanıcı İşlemleri',
      type: 'collapse',
      icon: icons.IconUsers,

      children: [
        {
          id: 'user',
          title: 'Kullanıcılar',
          type: 'item',
          url: 'users',
          icon:icons.IconUser,
          target: true
          
        },
        // {
        //   id: 'register3',
        //   title: 'Register',
        //   type: 'item',
        //   url: '/pages/register/register3',
        //   target: true
        // }
      ]
    }
  ]
};

export default dashboard;
