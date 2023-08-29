import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CountrySelect from "../../components/CountrySelect";
import {
  checkStringVariableEmpty,
  checkVariableNullOrUndefined,
  validateEmail,
} from "../../utils/Utils";

const defaultTheme = createTheme();

export default function SignUp() {
  const initialFormState = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    repassword: "",
    userVisibilityType: 3,
    countryId: "",
  };

  const initialErrorState = {
    firstNameError: false,
    lastNameError: false,
    usernameError: false,
    emptyMailError: false,
    notValidEmailError: false,
    emptyPasswordError: false,
    notMatchPasswordError: false,
    emptyRepasswordError: false,
    countryIdError: false,
  };

  // Tüm form verileri state
  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState(initialErrorState);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const validation = () => {
    setFormErrors(initialErrorState);
    setShowSnackbar(false);
    console.log(formData)
    if (
      checkVariableNullOrUndefined(formData.firstName) ||
      checkStringVariableEmpty(formData.firstName)
    )
      setFormErrors((prevData) => ({
        ...prevData,
        firstNameError: true,
      }));
    if (
      checkVariableNullOrUndefined(formData.lastName) ||
      checkStringVariableEmpty(formData.lastName)
    )
      setFormErrors((prevData) => ({
        ...prevData,
        lastNameError: true,
      }));
    if (
      checkVariableNullOrUndefined(formData.username) ||
      checkStringVariableEmpty(formData.username)
    )
      setFormErrors((prevData) => ({
        ...prevData,
        usernameError: true,
      }));
    if (
      checkVariableNullOrUndefined(formData.email) ||
      checkStringVariableEmpty(formData.email)
    ) {
      setFormErrors((prevData) => ({
        ...prevData,
        emptyMailError: true,
      }));
      
    }
    else{
      if (!validateEmail(formData.email))
        setFormErrors((prevData) => ({
          ...prevData,
          notValidEmailError: true,
        }));
    }

    if (
      checkVariableNullOrUndefined(formData.countryId) ||
      checkStringVariableEmpty(formData.countryId)
    )
      setFormErrors((prevData) => ({
        ...prevData,
        countryIdError: true,
      }));

    setShowSnackbar(true);
  };

  useEffect(() => {}, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    validation();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowSnackbar(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Snackbar
          open={showSnackbar}
          onClose={() => setShowSnackbar(false)}
          bodyStyle={{
            height: "auto",
            lineHeight: "28px",
            padding: 24,
            whiteSpace: "pre-line",
          }}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {formErrors.firstNameError && (
              <Typography>Ad alanı boş bırakılamaz.</Typography>
            )}
            {formErrors.lastNameError && (
              <Typography>Soyad alanı boş bırakılamaz.</Typography>
            )}
            {formErrors.usernameError && (
              <Typography>Kullanıcı adı alanı boş bırakılamaz. </Typography>
            )}
            {formErrors.emptyMailError && (
              <Typography>E-posta alanı boş bırakılamaz. </Typography>
            )}
            {formErrors.notValidEmailError && (
              <Typography>E-posta geçerli değil. </Typography>
            )}
            {formErrors.emptyPasswordError && (
              <Typography>Şifre alanı boş bırakılamaz. </Typography>
            )}
            {formErrors.emptyPasswordError && (
              <Typography>Şifre tekrar alanı boş bırakılamaz. </Typography>
            )}
            {formErrors.emptyRepasswordError && (
              <Typography>Şifre tekrar alanı boş bırakılamaz. </Typography>
            )}
            {formErrors.countryIdError && (
              <Typography>Ülke seçiniz. </Typography>
            )}
          </Alert>
        </Snackbar>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Kayıt Ol
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={formErrors.firstNameError}
                  onChange={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      firstName: e.target.value,
                    }));
                  }}
                  required
                  inputProps={{
                    maxLength: 50,
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
                    maxLength: 50,
                  }}
                  error={formErrors.lastNameError}
                  onChange={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      lastName: e.target.value,
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
                    maxLength: 100,
                  }}
                  error={formErrors.usernameError}
                  onChange={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      username: e.target.value,
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  inputProps={{
                    maxLength: 100,
                  }}
                  label="E-posta"
                  error={
                    formErrors.emptyMailError || formErrors.notValidEmailError
                  }
                  onChange={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      email: e.target.value,
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  inputProps={{
                    maxLength: 25,
                  }}
                  label="Şifre"
                  type="password"
                  error={
                    formErrors.emptyPasswordError ||
                    formErrors.notMatchPasswordError
                  }
                  onChange={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      password: e.target.value,
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  inputProps={{
                    maxLength: 25,
                  }}
                  label="Şifre Tekrar"
                  type="password"
                  error={
                    formErrors.emptyRepasswordError ||
                    formErrors.notMatchPasswordError
                  }
                  onChange={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      repassword: e.target.value,
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <CountrySelect
                  error={formErrors.countryIdError}
                  setCountryId={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      countryId: e.target.value,
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Gizlilik Seçimi:
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="3"
                  onChange={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      userVisibilityType: e.target.value,
                    }));
                  }}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Diğer kullanıcılar sadece adımı soyadımı görebilir"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Diğer kullanıcılar sadece kullanıcı adımı görebilir"
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label="Diğer kullanıcılar ad,soyad ve kullanıcı adımı görebilir"
                  />
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Kayıt ol
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
