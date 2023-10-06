import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { TabTitle, getCookie } from 'utils/utils';
import LoginIcon from '@mui/icons-material/Login';

export default function Home() {
  const username=getCookie("username");
  const email=getCookie("email");
  const fullname=getCookie("fullname");
  useEffect(() => {
    TabTitle("Han Taha")
  }, []);

  return username=='' || username===undefined || username ===null ?
  <>Oturum açılmamış.
  <Tooltip title="Giriş Yap">
              <IconButton aria-label="edit" size="small" onClick={()=>window.location.href = '/login'} >
                <LoginIcon color="primary" fontSize="inherit"  />
              </IconButton>
            </Tooltip>
  
  </>:<div>Hoşgeldin {fullname} email:{email} username:{username} </div>;
}
