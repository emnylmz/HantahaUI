import { Container, Grid } from '@mui/material';
import { useEffect } from 'react';
import { TabTitle } from 'utils/utils';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import WordCard from 'components/user/WordCard';

export default function Home() {
  useEffect(() => {
    TabTitle('Han Taha');
  }, []);

  return (
    <Container>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Paper
          className="wordSearch"
          component="form"
          variant="outlined"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Kelime Ara" />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>
      <Grid container direction="row" sx={{ m: 2 }} spacing={4}>
        <Grid item xs={4}>
          <WordCard />
        </Grid>
        <Grid item xs={4}>
          <WordCard />
        </Grid>
        <Grid item xs={4}>
          <WordCard />
        </Grid>
        <Grid item xs={4}>
          <WordCard />
        </Grid>
        <Grid item xs={4}>
          <WordCard />
        </Grid>
        <Grid item xs={4}>
          <WordCard />
        </Grid>
      </Grid>
    </Container>
  );
}
