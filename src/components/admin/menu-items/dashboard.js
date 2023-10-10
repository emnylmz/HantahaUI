// assets
import { IconUsers,IconUser,IconLanguage,IconLetterF } from '@tabler/icons';

// constant
const icons = { IconUsers,IconUser,IconLanguage,IconLetterF };

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
          id: 'users',
          title: 'Kullanıcılar',
          type: 'item',
          url: 'users',
          icon:icons.IconUser,
          target: true
          
        }
      ]
    },
  ],
};

export default dashboard;
