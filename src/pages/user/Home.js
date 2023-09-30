import React from 'react';
import { useEffect } from 'react';
import { TabTitle, getCookie } from 'utils/utils';

export default function Home() {
  useEffect(() => {
    TabTitle("Han Taha")
    console.log(getCookie('email'));
    console.log(getCookie('username'));
    
  }, []);

  return <div>User ana sayfa</div>;
}
