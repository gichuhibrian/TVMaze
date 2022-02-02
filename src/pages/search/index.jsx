import { IoClose, IoSearch } from 'react-icons/io5'
import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import ShowCard from '../../components/showCard'
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import styled from 'styled-components'


const SearchContainer = styled.div`
  display: flex;
  margin: 15px 0;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#fff",
    },
  },
});


const Search = () => {
  const [type, setType] = useState(0)
  const [searchText, setSearchText] = useState("");
  const [tvShows, setTvShows] = useState([])
  const [people, setPeople] = useState([])

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(`https://api.tvmaze.com/search/${type ? "people" : "shows"}?q=${searchText}`)
      if(type === 0) {
        setTvShows(data)
      }
      else if(type === 1) {
        setPeople(data)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const CleanUp = (value) => {
    if(value === 0) setTvShows([])
    if(value === 1) setPeople([])

  }

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <SearchContainer>
          <TextField
            style={{flex: 1, textColor: '#fff'}}
            id="search"
            label="search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            onClick={fetchSearch}
            variant='contained'
            style={{marginLeft: 10}}>
            <IoSearch />
          </Button>
        </SearchContainer>
        <Tabs
          value={type}
          indicatorColor='primary'
          textColor='#fff'
          onChange={(e, newValue) => {
            setType(newValue)
            CleanUp(newValue)
          }}
          style={{paddingBottom: 5}}
        >
          <Tab style={{ width: "50%" }} label="Search TV Show" />
          <Tab style={{ width: "50%" }} label="Search People" />
        </Tabs>
      </ThemeProvider>
        {type === 0 ? (
          <ResultContainer>
            {tvShows && tvShows.map(({show}, index) => (
              <ShowCard
                key={index}
                id={show.id}
                image={show.image && show.image.medium}
                name={show.name}
                status={show.status}
                date={show.premiered}
                rating={show.rating && show.rating.average}
              />
            ))}
          </ResultContainer>
        ): (
          <ResultContainer>
            {people && people.map(({person}, index) => (
              <ShowCard
                key={index}
                id={person.id}
                image={person.image && person.image.medium}
                name={person.name}
                status=""
                date=""
                rating=""
                type={0}
              />
            ))}
          </ResultContainer>
        )}

    </div>

  );
}

export default Search;
