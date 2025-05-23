import { Link } from 'react-router-dom';

// material-ui
import { useTheme,styled } from '@mui/material/styles';
import { Divider, Grid, Typography, useMediaQuery } from '@mui/material';

// project imports
import Logo from 'components/admin/Logo';

import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import MainCard from 'components/admin/cards/MainCard';
import ResetPasswordForm from './ResetPasswordForm';

const ResetPassword = () => {
  
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  const AuthWrapper = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    minHeight: '100vh'
  }));

  const AuthCardWrapper = ({ children, ...other }) => (
    <MainCard
      sx={{
        maxWidth: { xs: 400, lg: 475 },
        margin: { xs: 2.5, md: 3 },
        '& > *': {
          flexGrow: 1,
          flexBasis: '50%'
        }
      }}
      content={false}
      {...other}
    >
      <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>{children}</Box>
    </MainCard>
  );
  
  AuthCardWrapper.propTypes = {
    children: PropTypes.node
  };

  return (
    <AuthWrapper>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item sx={{ mb: 2 }}>
                    <Link to="/home">
                      <Logo />
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <ResetPasswordForm/>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item container direction="column" alignItems="center" xs={12}>
                      <Typography component={Link} to="/auth/register" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                      Hesabınız yok mu?
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default ResetPassword;
