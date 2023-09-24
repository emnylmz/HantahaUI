import React from 'react'
import { useEffect } from 'react';
import { getCookie } from 'utils/utils';

export default function Home() {

  useEffect(() => {
    console.log(getCookie('isAdmin'))
  }, []);


  return (
    <div>
       User ana sayfa
    </div>
  )
}
