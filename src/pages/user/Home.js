import React from 'react';
import { useEffect } from 'react';
import { TabTitle } from 'utils/utils';

export default function Home() {
  useEffect(() => {
    TabTitle("Han Taha")
    
  }, []);

  return <div>User ana sayfa</div>;
}
