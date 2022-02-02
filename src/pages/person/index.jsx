import './SingleShow.css'

import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { unavailable, unavailableLandscape } from '../../config'

import ShowsCarousel from '../../components/showsCarousel'
import { DataGrid } from '@mui/x-data-grid';
import Genre from '../../components/genre'
import ReactCountryFlag from "react-country-flag"
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import axios from 'axios'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'


function calculate_age(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  padding: 5px;
  margin: 5px 0;
  background-color: #282c34;
  border-radius: 10px;
  position: relative;
  font-family: "Montserrat", sans-serif;

  &:hover {
    background-color: white;
    color: black;
  }

  @media(max-width:550px) {
    width: 46%;
  }
`;

const GalleryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ExtraContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ExtraHeader = styled.h4`
  margin: 10px;
`;


const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#fff",
    },
  },
});

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'image.medium',
    headerName: 'Image',
    width: 200,
    valueGetter: (params) =>
      `${params.row.image.medium}`
  },
  { field: 'name', headerName: 'Name', width: 230 },
  { field: 'season', headerName: 'Season', width: 130 },
  {
    field: 'airdate',
    headerName: 'Air Date',
    width: 150,
  },
  {
    field: 'rating',
    headerName: 'Rating',
    width: 90,
    valueGetter: (params) =>
      `${params.row.rating.average}`
  },
  {
    field: 'actions',
    headerName: 'Action',
    width: 150,
  },
];

const SinglePerson = () => {
  const [type, setType] = useState(0)
  const [person, setPerson] = useState([])

  const {personId} = useParams()

  const fetchPerson = async () => {
    try {
      const { data } = await axios.get(`https://api.tvmaze.com/people/${personId}`)
      setPerson(data)
      console.log('person', data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPerson();
    // eslint-disable-next-line
  }, [type]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Tabs
          value={type}
          indicatorColor='primary'
          textColor='inherit'
          onChange={(e, newValue) => {
            setType(newValue)
          }}
          style={{paddingBottom: 5}}
        >
          <Tab style={{ width: "33%" }} label="Show Information" />
        </Tabs>
      </ThemeProvider>


      {type === 0 && (
        <div className="ContentModal">
          <img
            src={
              person.image
                ? person.image.medium
                : unavailable
            }
            alt={person.name}
            className="ContentModal__portrait"
          />
          <img
            src={
              person.image
                ? person.image.original
                : unavailableLandscape
            }
            alt={person.name}
            className="ContentModal__landscape"
          />
          <div className="ContentModal__about">
            <span className="ContentModal__title">
              {person.name} (
              {(
                person.birthday ||
                "-----"
              ).substring(0, 4)}
              )
            </span>

            <ExtraContainer>
              <ExtraHeader>Nationality:</ExtraHeader>
              {person.country && person.country.name}
              <ReactCountryFlag
                className="emojiFlag"
                countryCode={person.country && person.country.code}
                style={{
                    fontSize: '1em',
                    lineHeight: '1em',
                    margin: '3px',
                }}
                aria-label={person.country && person.country.name}
              />
            </ExtraContainer>

            <ExtraContainer>
              <ExtraHeader>Gender: </ExtraHeader>
              {person.gender}
            </ExtraContainer>

            <ExtraContainer>
              <ExtraHeader>Date of Birth: </ExtraHeader>
              {person.birthday}
            </ExtraContainer>

            <ExtraContainer>
              <ExtraHeader>Age: </ExtraHeader>
              {calculate_age(new Date(person.birthday))}
            </ExtraContainer>

            <div>
              <h3>Other Shows</h3>
              <ShowsCarousel id={personId}/>
            </div>

          </div>
        </div>
        )}

    </div>

  );
}

export default SinglePerson;
