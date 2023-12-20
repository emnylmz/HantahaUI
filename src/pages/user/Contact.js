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
    TabTitle('Han Taha | Bize Ulaşın');
    const fetchData = async () => {
      getList(1);
    };
    fetchData();
  }, []);

  return (
    <Container>
      Sayfa yapım aşamasındadır...
    </Container>
  );
}
