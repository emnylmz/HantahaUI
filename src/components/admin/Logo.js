// material-ui

import logo from 'assets/images/hantaha-logo.png'

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * 
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {

  return (
     <img src={logo} alt="HanTaha" />
  );
}

export default Logo;
