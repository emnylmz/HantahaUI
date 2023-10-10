// assets
import { IconLanguage,IconLetterF } from '@tabler/icons';


// constant
const icons = {
  IconLanguage,
  IconLetterF
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const languageManagementPages = {
  id: 'languageManagementPages',
  title: 'Dil Yönetimi',
  type: 'group',
  children: [
    {
      id: 'language',
      title: 'Diller',
      type: 'item',
      url: 'language',
      icon:icons.IconLanguage,
      target: true
    },
    {
      id: 'verb',
      title: 'Fiiller',
      type: 'item',
      url: 'verb',
      icon:icons.IconLetterF,
      target: true
    },
  ],
};

export default languageManagementPages;
