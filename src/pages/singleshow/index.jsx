import './SingleShow.css'

import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { unavailable, unavailableLandscape } from '../../config'

import Carousel from '../../components/peopleCarousel'
import { DataGrid } from '@mui/x-data-grid';
import Genre from '../../components/genre'
import ReactCountryFlag from "react-country-flag"
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import axios from 'axios'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

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

const SingleShow = () => {
  const [type, setType] = useState(0)
  const [show, setShow] = useState([])
  const [episodes, setEpisodes] = useState([])
  const [gallery, setGallery] = useState([])

  const {showId} = useParams()

  const fetchShow = async () => {
    try {
      const { data } = await axios.get(`https://api.tvmaze.com/shows/${showId}`)
      setShow(data)
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEpisodes = async () => {
    try {
      const { data } = await axios.get(`https://api.tvmaze.com/shows/${showId}/episodes`)
      setEpisodes(data)
    } catch (error) {
      console.error(error);
    }
  }

  const fetchGallery = async () => {
    try {
      const { data } = await axios.get(`https://api.tvmaze.com/shows/${showId}/images`)
      setGallery(data)
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    fetchShow();
    fetchEpisodes();
    fetchGallery();
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
          <Tab style={{ width: "33%" }} label="Episodes" />
          <Tab style={{ width: "33%" }} label="Gallery" />
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
      </div>): type === 1 ? (
      <div style={{ height: 600, width: '100%', backgroundColor: '#fff' }}>
        <DataGrid
          rows={episodes}
          columns={columns}
          pageSize={13}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    ): (
      <GalleryContainer>
        {gallery && gallery.map(({resolutions}, index) => (
          <ImageContainer key={index}>
              <img
                style={{borderRadius: "10px"}}
                src={resolutions && resolutions.original && resolutions.original.url ? `${resolutions.original.url}` : `${unavailable}`}
                alt={`${resolutions.original.url}`}
              />
          </ImageContainer>
        ))}
      </GalleryContainer>
    )}

    </div>

  );
}

export default SingleShow;
