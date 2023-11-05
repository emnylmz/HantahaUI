import { Container, Grid } from '@mui/material';
import { useEffect } from 'react';
import { TabTitle } from 'utils/utils';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import WordCard from 'components/user/WordCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import VerbService from 'services/VerbService';
import { useCallback } from 'react';
import BackDrop from 'components/BackDrop';

export default function Home() {
  const verbService = new VerbService();

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [verbItems, setVerbItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [paginationIsDisabled, setPaginationIsDisabled] = useState(false);

  const handleChange = (event, value) => {
    getList(value);
    setPage(value);
  };

  const search = () => {
    getList(1);
  };

  const getList = useCallback(
    async (pageNumber) => {
      setLoading(true);
      try {
        const verbList = await verbService.getVerbItemListByPageNumber(pageNumber, searchText);
        setPageCount(verbList.pageCount);
        setVerbItems(verbList.verbItems);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    [verbService]
  );

  useEffect(() => {
    TabTitle('Han Taha');
    const fetchData = async () => {
      getList(1);
    };
    fetchData();
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
          <InputBase
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{ ml: 1, flex: 1 }}
            onKeyDown={(e) => {
              
              if (e.key === 'Enter') {
                e.preventDefault();
                search();
              }
            }}
            placeholder="Kelime Ara"
          />
          <IconButton type="button" sx={{ p: '5px' }} aria-label="search" onClick={search}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>
      {!loading ? (
        <>
          <Grid style={{ marginTop: '5px' }} container direction="row" spacing={2}>
            {verbItems.map((verbItem, index) => (
              <Grid key={index} item xs={12} sm={6} md={6} lg={4}>
                <WordCard verbItem={verbItem} />
              </Grid>
            ))}
          </Grid>
          <Stack spacing={2}>
            <Grid sx={4} style={{ marginTop: '10px', marginBottom: '10px' }} container direction="row" justifyContent="center" alignItems="center">
              <Pagination size="small" disabled={paginationIsDisabled} count={pageCount} page={page} onChange={handleChange} />
            </Grid>
          </Stack>
        </>
      ) : (
        
        <BackDrop loading={loading} />
      )}
    </Container>
  );
}
