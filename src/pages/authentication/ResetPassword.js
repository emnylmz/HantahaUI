import { Link, useParams } from 'react-router-dom';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import Logo from 'components/admin/Logo';

import PropTypes from 'prop-types';
import { Box, FormControl, InputLabel, OutlinedInput, FormHelperText, Button,InputAdornment,IconButton, } from '@mui/material';
import MainCard from 'components/admin/cards/MainCard';
import { useState } from 'react';
import UserService from 'services/UserService';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from '../../utils/hooks/useScriptRef';
import AnimateButton from 'components/admin/extended/AnimateButton';
import { TabTitle, checkStringVariableEmpty, checkVariableNullOrUndefined, showAlert, showError } from 'utils/utils';
import { useEffect } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import { VisibilityOff } from '@mui/icons-material';

const ForgotPassword = () => {
  TabTitle('Hantaha | Şifremi Sıfırla');

  let { resetToken } = useParams();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  
  const userService = new UserService();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowRepassword = () => {
    setShowPassword(!showRePassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  const AuthWrapper = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    minHeight: '100vh'
  }));

  let checkToken = async () => {
    var result = await userService.checkToken({ Token: resetToken.trim() }); // Trim whitespace

    if (result.toUpperCase() === "NOT_FOUND") { // Case-insensitive check
        return false;
    } 
    return true;
};

// TODO burada yapı olmadı form yapısı düzeltilecek
let resetPassword = async (password,repeatpassword) => {
  setLoading(true);
  var result = await userService.resetPassword({Password:password,RepeatPassword:repeatpassword,Token:resetToken});

  if(result==true)
  {
    showAlert("Şifre başarıyla değiştirildi.Girişe yönlendiriliyorsunuz..")
    setTimeout(function() {
      window.location.href = '/auth/login';
    }, 2000);
  }
    
  setLoading(false);
};

useEffect(() => {
  
  setLoading(true);
  const checkResetToken = async () => {
      if (
          checkVariableNullOrUndefined(resetToken) ||
          checkStringVariableEmpty(resetToken) ||
          !(await checkToken())
      ) {
          window.location.href = "/404";
      }
  };

  checkResetToken();
  setLoading(false);
}, []);

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
                    <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                            Şifrenizi sıfırlamak için bilgilerinizi giriniz
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <>
                      <Grid container direction="column" justifyContent="center" spacing={2}>
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              alignItems: 'center',
                              display: 'flex'
                            }}
                          ></Box>
                        </Grid>
                      </Grid>

                      <Formik
                        initialValues={{
                          password: '',
                          repassword: '',
                          submit: null
                        }}
                        validationSchema={Yup.object().shape({
                          password: Yup.string().max(255).required('Şifre boş bırakılamaz.'),
                          repassword: Yup.string()
                            .oneOf([Yup.ref('password'), null], 'Şifreler eşleşmiyor') // Burada kontrolü ekliyoruz
                            .max(255)
                            .required('Şifre tekrar boş bırakılamaz.')
                        })}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                          try {
                            if (scriptedRef.current) {
                              setStatus({ success: true });
                              resetPassword( values.password,values.repassword );
                            }
                          } catch (err) {
                            if (scriptedRef.current) {
                              setStatus({ success: false });
                              setErrors({ submit: err.message });
                              setSubmitting(false);
                            }
                          }
                        }}
                      >
                        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                          <form noValidate onSubmit={handleSubmit}>
                            <FormControl
                              fullWidth
                              error={Boolean(touched.password && errors.password)}
                              sx={{ ...theme.typography.customInput }}
                            >
                              <InputLabel htmlFor="outlined-adornment-password-login">Şifre</InputLabel>
                              <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={(e)=>setPassword(e.target.value)}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                      edge="end"
                                      size="large"
                                    >
                                      {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                  </InputAdornment>
                                }
                                label="Password"
                                inputProps={{}}
                              />
                              {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                  {errors.password}
                                </FormHelperText>
                              )}
                            </FormControl>

                            <FormControl
                              fullWidth
                              error={Boolean(touched.repassword && errors.repassword)}
                              sx={{ ...theme.typography.customInput }}
                            >
                              <InputLabel htmlFor="outlined-adornment-repassword-login">Şifre Tekrar</InputLabel>
                              <OutlinedInput
                                id="outlined-adornment-repassword-login"
                                type={showRePassword ? 'text' : 'password'}
                                value={rePassword}
                                name="repassword"
                                onBlur={handleBlur}
                                onChange={(e)=>setRePassword(e.target.value)}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle repassword visibility"
                                      onClick={handleClickShowRepassword}
                                      onMouseDown={handleMouseDownPassword}
                                      edge="end"
                                      size="large"
                                    >
                                      {showRePassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                  </InputAdornment>
                                }
                                label="Password"
                                inputProps={{}}
                              />
                              {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                  {errors.password}
                                </FormHelperText>
                              )}
                            </FormControl>

                            {errors.submit && (
                              <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                              </Box>
                            )}

                            <Box sx={{ mt: 2 }}>
                              <AnimateButton>
                                <Button
                                  disableElevation
                                  disabled={loading}
                                  fullWidth
                                  size="large"
                                  type="submit"
                                  variant="contained"
                                  color="secondary"
                                >
                                  Şifremi Sıfırla
                                </Button>
                              </AnimateButton>
                            </Box>
                          </form>
                        )}
                      </Formik>
                    </>
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
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}></Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default ForgotPassword;
