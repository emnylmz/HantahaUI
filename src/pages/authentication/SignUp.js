import React, { useEffect, useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import Logo from 'components/admin/Logo';
import * as alertify from 'alertifyjs';
import { Navigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Link,
  FormControlLabel,
  CssBaseline,
  Button,
  Container,
  TextField,
  Typography,
  RadioGroup,
  Radio,
  FormLabel,
  createTheme,
  ThemeProvider,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import CountrySelect from '../../components/admin/CountrySelect';
import {
  TabTitle,
  checkStringVariableEmpty,
  checkVariableNullOrUndefined,
  containsRequiredCharacters,
  validateEmail
} from '../../utils/utils';
import UserService from 'services/UserService';
import CountryService from 'services/CountryService';

const defaultTheme = createTheme();

export default function SignUp() {
  TabTitle('Hantaha | Üye Ol');
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

  // Tüm form verileri state
  const [formData, setFormData] = useState(initialFormState);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepassword, setShowRepassword] = useState(false);
  const [navigate, setNavigate] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowRepassword = () => setShowRepassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validation = async () => {
    if (checkVariableNullOrUndefined(formData.firstName) || checkStringVariableEmpty(formData.firstName)) {
      alertify.error('Ad alanı boş bırakılamaz.');
      return;
    }

    if (checkVariableNullOrUndefined(formData.lastName) || checkStringVariableEmpty(formData.lastName)) {
      alertify.error('Soyad alanı boş bırakılamaz.');
      return;
    }

    if (checkVariableNullOrUndefined(formData.username) || checkStringVariableEmpty(formData.username)) {
      alertify.error('Kullanıcı adı alanı boş bırakılamaz.');
      return;
    }

    if (checkVariableNullOrUndefined(formData.email) || checkStringVariableEmpty(formData.email)) {
      alertify.error('E-posta alanı boş bırakılamaz.');
      return;
    } else {
      if (!validateEmail(formData.email)) {
        alertify.error('E-posta geçerli değil.');
        return;
      }
    }

    if (checkVariableNullOrUndefined(formData.password) || checkStringVariableEmpty(formData.password)) {
      alertify.error('Şifre alanı boş bırakılamaz.');
      return;
    }

    if (formData.password.length < 12) {
      alertify.error('Şifre en az 12 karakter uzunluğunda olmalıdır.');
      return;
    }

    if (!containsRequiredCharacters(formData.password)) {
      alertify.error('Şifre büyük harf, küçük harf, rakam ve sembol içermelidir.');
      return;
    }

    if (checkVariableNullOrUndefined(formData.repassword) || checkStringVariableEmpty(formData.repassword)) {
      alertify.error('Şifre tekrar alanı boş bırakılamaz.');
      return;
    }

    if (formData.password !== formData.repassword) {
      alertify.error('Şifre alanları uyumsuz.');
      return;
    }

    if (checkVariableNullOrUndefined(formData.countryId) || checkStringVariableEmpty(formData.countryId)) {
      alertify.error('Ülke seçiniz.');
      return;
    }

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
    let result = await register(userData);
    if (result) setNavigate(true);
  };

  let register = async (userData) => {
    const userService = new UserService();
    return await userService.register(userData);
  };

  const [countries, setCountries] = useState([]);

  let getAllCountries = async () => {
    const countryService = new CountryService();
    var data = await countryService.getAllCountries();
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCountries = await getAllCountries();
      setCountries(fetchedCountries);
    };

    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    validation();
  };

  return (
    <>
      {navigate ? <Navigate to="/auth/login"></Navigate> : <></>}
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <ReactLink to="/home">
              <Logo />
            </ReactLink>
            <Typography component="h1" variant="h6" style={{ marginTop: '20px' }}>
              Kayıt Ol
            </Typography>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
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
                    countries={countries}
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
                  <Link href="/auth/login" variant="body2">
                    Zaten bir hesabınız var mı? Oturum aç
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
