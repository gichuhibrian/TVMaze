import './App.css';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import Container from '@mui/material/Container';
import Error from './pages/error'
import Header from './components/header'
import Search from './pages/search'
import Series from './pages/series'
import SingleShow from './pages/singleshow'
import SinglePerson from './pages/person'

import SimpleBottomNavigation from './components/bottomNavigation'
import styled from 'styled-components'

const AppContainer = styled.div`
    min-height: 100vh;
    background-color: #39445a;
    color: #fff;
    padding-top: 130px;
    padding-bottom: 70px;

    @media(max-width: 700px) {
      padding-top: 70px;
    }
  `;

function App() {
  return (
    <Router>
      <Header />
      <AppContainer>
        <Container>
          <Routes>

            <Route exact path='/' element = {<Search />} />
            <Route path='/series' element = {<Series />} />
            <Route path='/show/:showId' element = {<SingleShow />} />
            <Route path='/person/:personId' element = {<SinglePerson />} />

            <Route path="*" element = {<Error />} />

          </Routes>
        </Container>
      </AppContainer>
    </Router>
  );
}

export default App;
