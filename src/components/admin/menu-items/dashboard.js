// assets
import { IconUsers,IconUser,IconLanguage,IconLetterF,IconBug } from '@tabler/icons';

// constant
const icons = { IconUsers,IconUser,IconLanguage,IconLetterF,IconBug };

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
    {
      id: 'systemLog',
      title: 'Hata Yönetimi',
      type: 'item',
      url: 'systemLog',
      icon: icons.IconBug,
      target: true
    },
  ],
};

export default dashboard;
