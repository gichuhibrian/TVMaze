import './SingleShow.css'

import { IoClose, IoSearch } from 'react-icons/io5'
import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { unavailable, unavailableLandscape } from '../../config'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Carousel from '../../components/peopleCarousel'
import { DataGrid } from '@mui/x-data-grid';
import Genre from '../../components/genre'
import ReactCountryFlag from "react-country-flag"
import ShowCard from '../../components/showCard'
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

const CardContainer = styled.div`
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

const ExtraContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ExtraHeader = styled.h4`
  margin: 10px;
`;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
  height: "80%",
  bgcolor: "#39445a",
  border: '1px solid #282c34',
  borderRadius: 10,
  color: "white",
  boxShadow: 24,
  p: 4
};

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
    field: 'image',
    headerName: 'Image',
    width: 100,
  },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'season', headerName: 'Season', width: 130 },
  {
    field: 'airdate',
    headerName: 'Air Date',
    width: 90,
  },
  {
    field: 'rating',
    headerName: 'Rating',
    width: 90,
  },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];




const SingleShow = () => {
  const [type, setType] = useState(0)
  const [searchText, setSearchText] = useState("");
  const [show, setShow] = useState([])
  const [episodes, setEpisodes] = useState([])

  const {showId} = useParams()

  const fetchShow = async () => {
    try {
      const { data } = await axios.get(`https://api.tvmaze.com/shows/${showId}`)
      setShow(data)
      console.log('data', data)
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEpisodes = async () => {
    try {
      const { data } = await axios.get(`https://api.tvmaze.com/shows/${showId}/episodes`)
      setEpisodes(data)
      console.log('episodes', data)
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    fetchShow();
    fetchEpisodes();
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
          <Tab style={{ width: "50%" }} label="Show Information" />
          <Tab style={{ width: "50%" }} label="Episodes" />
        </Tabs>
      </ThemeProvider>


      {type === 0 ? (<div className="ContentModal">
        <img
          src={
            show.image
              ? show.image.medium
              : unavailable
          }
          alt={show.name}
          className="ContentModal__portrait"
        />
        <img
          src={
            show.image
              ? show.image.original
              : unavailableLandscape
          }
          alt={show.name}
          className="ContentModal__landscape"
        />
        <div className="ContentModal__about">
          <span className="ContentModal__title">
            {show.name} (
            {(
              show.premiered ||
              "-----"
            ).substring(0, 4)}
            )
          </span>
          <ExtraContainer>
            <ExtraHeader>Genres: </ExtraHeader>
            <Genre genres={show && show.genres || []} />
          </ExtraContainer>

          <ExtraContainer>
            <ExtraHeader>Country:</ExtraHeader>
            {show.network && show.network.country && show.network.country.name}
            <ReactCountryFlag
              className="emojiFlag"
              countryCode={show.network && show.network.country && show.network.country.code}
              style={{
                  fontSize: '1em',
                  lineHeight: '1em',
                  margin: '3px',
              }}
              aria-label={show.network && show.network.country && show.network.country.name}
            />
          </ExtraContainer>

          <ExtraContainer>
            <ExtraHeader>Schedule: </ExtraHeader>
            {`${show.network && show.network.name || show.webChannel && show.webChannel.name} Network on ${show.schedule && show.schedule.days[0] || "--"} at ${show.schedule && show.schedule.time || "--"}`}
          </ExtraContainer>

          <ExtraContainer>
            <ExtraHeader>Status: </ExtraHeader>
            {show.status === "Ended" ? "Completed" : "Ongoing"}
          </ExtraContainer>

          <span className="ContentModal__description">
            {show.summary}
          </span>

          <div>
            <h3>Casts</h3>
            <Carousel id={showId}/>
          </div>
        </div>
      </div>): (
      <div style={{ height: 600, width: '100%', backgroundColor: '#fff' }}>
        <DataGrid
          rows={episodes}
          columns={columns}
          pageSize={13}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
      )}

    </div>

  );
}

export default SingleShow;
