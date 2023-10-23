import { useEffect } from 'react';
import { TabTitle } from 'utils/utils';

export default function Home() {
  useEffect(() => {
    TabTitle("Han Taha")
  }, []);

  return (
    
    <div style={{ height: "100vh" }}>Blabla</div>
  )
}
