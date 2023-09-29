import alertify from 'alertifyjs';
import React from 'react';
import { useEffect } from 'react';
import { getCookie } from 'utils/utils';

export default function Home() {
  useEffect(() => {
    console.log(getCookie('email'));
    console.log(getCookie('username'));
    alertify.prompt(
      'This is a prompt dialog.',
      'Default value',
      function (evt, value) {
        alertify.success('Ok: ' + value);
      },
      function () {
        alertify.error('Cancel');
      }
    );
  }, []);

  return <div>User ana sayfa</div>;
}
