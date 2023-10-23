// assets
import { IconLanguage, IconLetterF, IconLetterC } from '@tabler/icons';

// constant
const icons = {
  IconLanguage,
  IconLetterF,
  IconLetterC
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
      icon: icons.IconLanguage,
      target: true
    },
    {
      id: 'verb',
      title: 'Fiiller',
      type: 'item',
      url: 'verb',
      icon: icons.IconLetterF,
      target: true
    },
    {
      id: 'sentence',
      title: 'Cümleler',
      type: 'item',
      url: 'sentence',
      icon: icons.IconLetterC,
      target: true
    }
  ]
};

export default languageManagementPages;
