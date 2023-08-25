import React,{ useState } from 'react';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Autocomplete from '@mui/material/Autocomplete';
import { Popper } from "@mui/material";
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {

const [countryId, setCountryId] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      film: countryId,
    });
  };

  const top100Films = [
    { label: 'The Shawshank Redemption', ear: 1994 },
    { label: 'The Godfather', ear: 1972 },
    { label: 'The Godfather: Part II', ear: 1974 },
    { label: 'The Dark Knight', ear: 2008 },
    { label: '12 Angry Men', ear: 1957 },
    { label: "Schindler's List", ear: 1993 },
    { label: 'Pulp Fiction', ear: 1994 },
    {
      label: 'The Lord of the Rings: The Return of the King',
      ear: 2003,
    },
    { label: 'The Good, the Bad and the Ugly', ear: 1966 },
    { label: 'Fight Club', ear: 1999 },
    {
      label: 'The Lord of the Rings: The Fellowship of the Ring',
      ear: 2001,
    },
    {
      label: 'Star Wars: Episode V - The Empire Strikes Back',
      ear: 1980,
    },
    { label: 'Forrest Gump', ear: 1994 },
    { label: 'Inception', ear: 2010 },
    {
      label: 'The Lord of the Rings: The Two Towers',
      ear: 2002,
    },
    { label: "One Flew Over the Cuckoo's Nest", ear: 1975 },
    { label: 'Goodfellas', ear: 1990 },
    { label: 'The Matrix', ear: 1999 },
    { label: 'Seven Samurai', ear: 1954 },
    {
      label: 'Star Wars: Episode IV - A New Hope',
      ear: 1977,
    },
    { label: 'City of God', ear: 2002 },
    { label: 'Se7en', ear: 1995 },
    { label: 'The Silence of the Lambs', ear: 1991 },
    { label: "It's a Wonderful Life", ear: 1946 },
    { label: 'Life Is Beautiful', ear: 1997 },
    { label: 'The Usual Suspects', ear: 1995 },
    { label: 'Léon: The Professional', ear: 1994 },
    { label: 'Spirited Away', ear: 2001 },
    { label: 'Saving Private Ryan', ear: 1998 },
    { label: 'Once Upon a Time in the West', ear: 1968 },
    { label: 'American History X', ear: 1998 },
    { label: 'Interstellar', ear: 2014 },
    { label: 'Casablanca', ear: 1942 },
    { label: 'City Lights', ear: 1931 },
    { label: 'Psycho', ear: 1960 },
    { label: 'The Green Mile', ear: 1999 },
    { label: 'The Intouchables', ear: 2011 },
    { label: 'Modern Times', ear: 1936 },
    { label: 'Raiders of the Lost Ark', ear: 1981 },
    { label: 'Rear Window', ear: 1954 },
    { label: 'The Pianist', ear: 2002 },
    { label: 'The Departed', ear: 2006 },
    { label: 'Terminator 2: Judgment Day', ear: 1991 },
    { label: 'Back to the Future', ear: 1985 },
    { label: 'Whiplash', ear: 2014 },
    { label: 'Gladiator', ear: 2000 },
    { label: 'Memento', ear: 2000 },
    { label: 'The Prestige', ear: 2006 },
    { label: 'The Lion King', ear: 1994 },
    { label: 'Apocalypse Now', ear: 1979 },
    { label: 'Alien', ear: 1979 },
    { label: 'Sunset Boulevard', ear: 1950 },
    {
      label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
      ear: 1964,
    },
    { label: 'The Great Dictator', ear: 1940 },
    { label: 'Cinema Paradiso', ear: 1988 },
    { label: 'The Lives of Others', ear: 2006 },
    { label: 'Grave of the Fireflies', ear: 1988 },
    { label: 'Paths of Glory', ear: 1957 },
    { label: 'Django Unchained', ear: 2012 },
    { label: 'The Shining', ear: 1980 },
    { label: 'WALL·E', ear: 2008 },
    { label: 'American Beauty', ear: 1999 },
    { label: 'The Dark Knight Rises', ear: 2012 },
    { label: 'Princess Mononoke', ear: 1997 },
    { label: 'Aliens', ear: 1986 },
    { label: 'Oldboy', ear: 2003 },
    { label: 'Once Upon a Time in America', ear: 1984 },
    { label: 'Witness for the Prosecution', ear: 1957 },
    { label: 'Das Boot', ear: 1981 },
    { label: 'Citizen Kane', ear: 1941 },
    { label: 'North by Northwest', ear: 1959 },
    { label: 'Vertigo', ear: 1958 },
    {
      label: 'Star Wars: Episode VI - Return of the Jedi',
      ear: 1983,
    },
    { label: 'Reservoir Dogs', ear: 1992 },
    { label: 'Braveheart', ear: 1995 },
    { label: 'M', ear: 1931 },
    { label: 'Requiem for a Dream', ear: 2000 },
    { label: 'Amélie', ear: 2001 },
    { label: 'A Clockwork Orange', ear: 1971 },
    { label: 'Like Stars on Earth', ear: 2007 },
    { label: 'Taxi Driver', ear: 1976 },
    { label: 'Lawrence of Arabia', ear: 1962 },
    { label: 'Double Indemnity', ear: 1944 },
    {
      label: 'Eternal Sunshine of the Spotless Mind',
      ear: 2004,
    },
    { label: 'Amadeus', ear: 1984 },
    { label: 'To Kill a Mockingbird', ear: 1962 },
    { label: 'Toy Story 3', ear: 2010 },
    { label: 'Logan', ear: 2017 },
    { label: 'Full Metal Jacket', ear: 1987 },
    { label: 'Dangal', ear: 2016 },
    { label: 'The Sting', ear: 1973 },
    { label: '2001: A Space Odyssey', ear: 1968 },
    { label: "Singin' in the Rain", ear: 1952 },
    { label: 'Toy Story', ear: 1995 },
    { label: 'Bicycle Thieves', ear: 1948 },
    { label: 'The Kid', ear: 1921 },
    { label: 'Inglourious Basterds', ear: 2009 },
    { label: 'Snatch', ear: 2000 },
    { label: '3 Idiots', ear: 2009 },
    { label: 'Monty Python and the Holy Grail', ear: 1975 },
  ];

  const PopperMy = function (props) {
    return ( <Popper {...props} placement="bottom" sx={{ height: "10px", }} style={{ width: props.anchorEl.clientWidth, height: "5px" }} /> )
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
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
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Ad"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Soyad"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Kullanıcı Adı"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="E-posta"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Şifre"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Şifre Tekrar"
                  type="password"
                  id="rePassword"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  PopperComponent={PopperMy}
                  ListboxProps={{ style: { maxHeight: 150 } }}
                  id="combo-box-demo"
                  // value={countryId || null}
                  onChange={(event, newValue) => {
                    setCountryId(newValue);
                  }}
                  options={top100Films}
                  noOptionsText="Sonuç Yok"
                  renderInput={(params) => (
                    <TextField {...params} label="Ülke" />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Gizlilik Seçimi:
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Diğer kullanıcılar adımı soyadımı görebilir"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Diğer kullanıcılar sadece kullanıcı adımı görebilir"
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label="Diğer kullanıcılar ad soyad kullanıcı adımı görebilir"
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
              Sign Up
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
