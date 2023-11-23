import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from '../../utils/hooks/useScriptRef';
import AnimateButton from 'components/admin/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TabTitle, checkStringVariableEmpty, checkVariableNullOrUndefined, showError, showSuccess } from 'utils/utils';
import {  useParams } from 'react-router-dom';
import { useEffect } from 'react';
import UserService from 'services/UserService';


const FirebaseLogin = ({ ...others }) => {
  TabTitle('Hantaha | Şifremi Sıfırla');
  const userService = new UserService();
  let { resetToken } = useParams();
  const theme = useTheme();
  const scriptedRef = useScriptRef();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowRePassword = () => {
    setShowRePassword(!showRePassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  let checkToken = async () => {
    var result = await userService.checkToken({ Token: resetToken.trim() }); // Trim whitespace

    if (result.toUpperCase() === 'NOT_FOUND') {
      // Case-insensitive check
      return false;
    }
    return true;
  };

  useEffect(() => {
    setLoading(true);
    const checkResetToken = async () => {
      if (checkVariableNullOrUndefined(resetToken) || checkStringVariableEmpty(resetToken) || !(await checkToken())) {
        window.location.href = '/404';
      }
    };

    checkResetToken();
    setLoading(false);
  }, []);

  let resetPassword = async (password, repeatpassword) => {
    setLoading(true);
    var result = await userService.resetPassword({ Password: password, RepeatPassword: repeatpassword, ResetToken: resetToken });

    if (result == true) {
      showSuccess('Şifre başarıyla değiştirildi.Girişe yönlendiriliyorsunuz..');
      setTimeout(function () {
        window.location.href = '/auth/login';
      }, 2000);
    }
    else{
        showError('Beklenmeyen bir hata oluştu.');
    }

    setLoading(false);
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Şifre Sıfırlama</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
            password: Yup.string()
              .min(12, 'Şifre en az 12 karakter uzunluğunda olmalıdır.')
              .matches(
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+.])[A-Za-z\d!@#$%^&*()_+.]+$/,
                'Şifre büyük harf, küçük harf, rakam ve sembol içermelidir.'
              )
              .required('Şifre boş bırakılamaz.'),
            repassword: Yup.string()
              .oneOf([Yup.ref('password'), null], 'Şifreler eşleşmiyor.')
              .required('Şifre tekrar boş bırakılamaz.')
          })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (scriptedRef.current) {
              if (values.password != values.repassword) {
                setStatus({ success: false });
                showError('Şifreler uyuşmuyor.');
                setSubmitting(false);
              } else {
                setStatus({ success: true });
                resetPassword(values.password, values.repassword);
              }
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
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Şifre *</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
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
            <FormControl fullWidth error={Boolean(touched.repassword && errors.repassword)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-repassword-login">Şifre Tekrar *</InputLabel>
              <OutlinedInput
                id="outlined-adornment-repassword-login"
                type={showRePassword ? 'text' : 'password'}
                value={values.repassword}
                name="repassword"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle repassword visibility"
                      onClick={handleClickShowRePassword}
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
              {touched.repassword && errors.repassword && (
                <FormHelperText error id="standard-weight-helper-text-repassword-login">
                  {errors.repassword}
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
                <Button disableElevation disabled={loading} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Şifremi Sıfırla
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseLogin;
