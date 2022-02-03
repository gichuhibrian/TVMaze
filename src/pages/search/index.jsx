import { IoSearch } from 'react-icons/io5'
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
  const [noContent, setNoContent] = useState(false)

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(`https://api.tvmaze.com/search/${type ? "people" : "shows"}?q=${searchText}`)
      if(type === 0) {
        if (data && data.length === 0) setNoContent(true);
        setTvShows(data)
      }
      else if(type === 1) {
        if (data && data.length === 0) setNoContent(true);
        setPeople(data)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const CleanUp = () => {
    setTvShows([])
    setPeople([])
    setNoContent(false)
  }

  const isEmpty = !tvShows || tvShows.length === 0;

  useEffect(() => {
    window.scroll(0, 0);
    CleanUp();
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
            onClick={() => {
              fetchSearch()
            }}
            variant='contained'
            style={{marginLeft: 10}}>
            <IoSearch />
          </Button>
        </SearchContainer>
        <Tabs
          value={type}
          indicatorColor='primary'
          textColor='inherit'
          onChange={(e, newValue) => {
            setType(newValue)
            CleanUp()
          }}
          style={{paddingBottom: 5}}
        >
          <Tab style={{ width: "50%" }} label="Search TV Show" />
          <Tab style={{ width: "50%" }} label="Search People" />
        </Tabs>
      </ThemeProvider>
        {!noContent && isEmpty &&(
          <ResultContainer>
            <p>No Result Found</p>
          </ResultContainer>
        )}
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
                date={person.birthday}
                country={person.country && person.country.name}
                countryCode={person.country && person.country.code}
                type={0}
              />
            ))}
          </ResultContainer>
        )}

    </div>

  );
}

export default Search;
