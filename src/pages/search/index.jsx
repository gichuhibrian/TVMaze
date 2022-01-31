import React from 'react';
import styled from 'styled-components'
import SearchBar from '../../components/searchBar'

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-top: 8em;
`;

const Search = () => (
  <AppContainer>
    <SearchBar />
  </AppContainer>

);

export default Search;
