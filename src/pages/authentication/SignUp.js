import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Link,
  FormControlLabel,
  CssBaseline,
  Button,
  Avatar,
  Container,
  TextField,
  Typography,
  RadioGroup,
  Radio,
  FormLabel,
  createTheme,
  ThemeProvider,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import CountrySelect from '../../components/admin/CountrySelect';
import { TabTitle, checkStringVariableEmpty, checkVariableNullOrUndefined, containsRequiredCharacters, validateEmail } from '../../utils/utils';
import UserService from 'services/UserService';

const defaultTheme = createTheme();

export default function SignUp() {
  TabTitle("Hantaha | Üye Ol");
  const initialFormState = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    repassword: '',
    userVisibilityType: 3,
    countryId: ''
  };

  const initialErrorState = {
    firstNameError: false,
    lastNameError: false,
    usernameError: false,
    emptyMailError: false,
    notValidEmailError: false,
    emptyPasswordError: false,
    notMatchPasswordError: false,
    shortPasswordError: false,
    containsRequiredCharactersError: false,
    emptyRepasswordError: false,
    countryIdError: false
  };

  // Tüm form verileri state
  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState(initialErrorState);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepassword, setShowRepassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowRepassword = () => setShowRepassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validation = async () => {
    setFormErrors(initialErrorState);
    setShowSnackbar(false);
    let hasErrors=false;
    if (checkVariableNullOrUndefined(formData.firstName) || checkStringVariableEmpty(formData.firstName)) {
      setFormErrors((prevData) => ({
        ...prevData,
        firstNameError: true
      }));
      hasErrors = true; // Hata varsa hasErrors'i true yap
    }

    if (checkVariableNullOrUndefined(formData.lastName) || checkStringVariableEmpty(formData.lastName)) {
      setFormErrors((prevData) => ({
        ...prevData,
        lastNameError: true
      }));
      hasErrors = true; // Hata varsa hasErrors'i true yap
    }

    if (checkVariableNullOrUndefined(formData.username) || checkStringVariableEmpty(formData.username)) {
      setFormErrors((prevData) => ({
        ...prevData,
        usernameError: true
      }));
      hasErrors = true; // Hata varsa hasErrors'i true yap
    }

    if (checkVariableNullOrUndefined(formData.email) || checkStringVariableEmpty(formData.email)) {
      setFormErrors((prevData) => ({
        ...prevData,
        emptyMailError: true
      }));
      hasErrors = true; // Hata varsa hasErrors'i true yap
    } else {
      if (!validateEmail(formData.email)) {
        setFormErrors((prevData) => ({
          ...prevData,
          notValidEmailError: true
        }));
        hasErrors = true; // Hata varsa hasErrors'i true yap
      }
    }

    if (checkVariableNullOrUndefined(formData.password) || checkStringVariableEmpty(formData.password)) {
      setFormErrors((prevData) => ({
        ...prevData,
        emptyPasswordError: true
      }));
      hasErrors = true; // Hata varsa hasErrors'i true yap
    }

    if (!formErrors.emptyPasswordError && formData.password.length < 12) {
      setFormErrors((prevData) => ({
        ...prevData,
        shortPasswordError: true
      }));
      hasErrors = true; // Hata varsa hasErrors'i true yap
    }

    if (!formErrors.emptyPasswordError && containsRequiredCharacters(formData.password)) {
      setFormErrors((prevData) => ({
        ...prevData,
        containsRequiredCharactersError: true
      }));
      hasErrors = true; // Hata varsa hasErrors'i true yap
    }

    if (checkVariableNullOrUndefined(formData.repassword) || checkStringVariableEmpty(formData.repassword)) {
      setFormErrors((prevData) => ({
        ...prevData,
        emptyRepasswordError: true
      }));
      hasErrors = true; // Hata varsa hasErrors'i true yap
    }

    if (!formErrors.emptyPasswordError && !formErrors.emptyRepasswordError && formData.password !== formData.repassword) {
      setFormErrors((prevData) => ({
        ...prevData,
        notMatchPasswordError: true
      }));
      hasErrors = true; // Hata varsa hasErrors'i true yap
    }

    if (checkVariableNullOrUndefined(formData.countryId) || checkStringVariableEmpty(formData.countryId)) {
      setFormErrors((prevData) => ({
        ...prevData,
        countryIdError: true
      }));
      hasErrors = true; // Hata varsa hasErrors'i true yap
    }

    if (hasErrors) {
      setShowSnackbar(true);
    } else {
      const userData = {
        Username: formData.username,
        FirstName: formData.firstName,
        LastName: formData.lastName,
        Email: formData.email,
        Password: formData.password,
        Repassword: formData.repassword,
        CountryId: formData.countryId,
        UserVisibilityType: formData.userVisibilityType
      };
      await register(userData);
    }
  };

  let register = async (userData) => {
    const userService = new UserService();
    var data = await userService
      .register(userData)
      .then((data) => {
        console.log('Başarılı işlem:', data);
      })
      .catch((data) => {
        console.error('Promise Hatası:', data.data.errors);
      });
    return data;
  };

  useEffect(() => {}, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    validation();
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    if (formErrors.includes(true)) {
      setShowSnackbar(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Snackbar
          open={showSnackbar}
          onClose={() => setShowSnackbar(false)}
          bodyStyle={{
            height: 'auto',
            lineHeight: '28px',
            padding: 24,
            whiteSpace: 'pre-line'
          }}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {formErrors.firstNameError && <Typography>Ad alanı boş bırakılamaz.</Typography>}
            {formErrors.lastNameError && <Typography>Soyad alanı boş bırakılamaz.</Typography>}
            {formErrors.usernameError && <Typography>Kullanıcı adı alanı boş bırakılamaz. </Typography>}
            {formErrors.emptyMailError && <Typography>E-posta alanı boş bırakılamaz. </Typography>}
            {formErrors.notValidEmailError && <Typography>E-posta geçerli değil. </Typography>}
            {formErrors.emptyPasswordError && <Typography>Şifre alanı boş bırakılamaz. </Typography>}
            {formErrors.emptyPasswordError && <Typography>Şifre tekrar alanı boş bırakılamaz. </Typography>}
            {formErrors.shortPasswordError && <Typography>Şifre en az 12 karakter uzunluğunda olmalıdır. </Typography>}
            {formErrors.containsRequiredCharactersError && (
              <Typography>Şifre büyük harf, küçük harf, rakam ve sembol içermelidir.</Typography>
            )}
            {formErrors.notMatchPasswordError && <Typography>Şifre alanları uyumsuz. </Typography>}
            {formErrors.countryIdError && <Typography>Ülke seçiniz. </Typography>}
          </Alert>
        </Snackbar>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Kayıt Ol
          </Typography>
          <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={formErrors.firstNameError}
                  onChange={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      firstName: e.target.value
                    }));
                  }}
                  required
                  inputProps={{
                    maxLength: 50
                  }}
                  fullWidth
                  label="Ad"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  inputProps={{
                    maxLength: 50
                  }}
                  error={formErrors.lastNameError}
                  onChange={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      lastName: e.target.value
                    }));
                  }}
                  label="Soyad"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Kullanıcı Adı"
                  inputProps={{
                    maxLength: 100
                  }}
                  error={formErrors.usernameError}
                  onChange={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      username: e.target.value
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  inputProps={{
                    maxLength: 100
                  }}
                  label="E-posta"
                  error={formErrors.emptyMailError || formErrors.notValidEmailError}
                  onChange={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      email: e.target.value
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Şifre *</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        password: e.target.value
                      }));
                    }}
                    error={formErrors.emptyPasswordError || formErrors.notMatchPasswordError}
                    inputProps={{
                      maxLength: 25
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Şifre"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Şifre Tekrar *</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-repassword"
                    type={showRepassword ? 'text' : 'password'}
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        repassword: e.target.value
                      }));
                    }}
                    error={formErrors.emptyRepasswordError || formErrors.notMatchPasswordError}
                    inputProps={{
                      maxLength: 25
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowRepassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showRepassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Şifre Tekrar"
                  />
                </FormControl>
                {/* <TextField
                  required
                  fullWidth
                  inputProps={{
                    maxLength: 25
                  }}
                  label="Şifre Tekrar"
                  type="password"
                  error={formErrors.emptyRepasswordError || formErrors.notMatchPasswordError}
                  onChange={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      repassword: e.target.value
                    }));
                  }}
                /> */}
              </Grid>
              <Grid item xs={12}>
                <CountrySelect
                  error={formErrors.countryIdError}
                  setCountryId={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      countryId: e
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel id="demo-radio-buttons-group-label">Gizlilik Seçimi:</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="3"
                  onChange={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      userVisibilityType: e.target.value
                    }));
                  }}
                >
                  <FormControlLabel value="1" control={<Radio />} label="Diğer kullanıcılar sadece adımı soyadımı görebilir" />
                  <FormControlLabel value="2" control={<Radio />} label="Diğer kullanıcılar sadece kullanıcı adımı görebilir" />
                  <FormControlLabel value="3" control={<Radio />} label="Diğer kullanıcılar ad,soyad ve kullanıcı adımı görebilir" />
                </RadioGroup>
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Kayıt ol
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                    Zaten bir hesabınız var mı? Oturum aç
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
