import { IoClose, IoSearch } from 'react-icons/io5'
import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { unavailable, unavailableLandscape } from '../../config'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Carousel from '../../components/peopleCarousel'
import Genre from '../../components/genre'
import ReactCountryFlag from "react-country-flag"
import ShowCard from '../../components/showCard'
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import './SingleShow.css'

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


const SingleShow = () => {
  const [type, setType] = useState(0)
  const [searchText, setSearchText] = useState("");
  const [show, setShow] = useState([])

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


  useEffect(() => {
    fetchShow();
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
      </div>): "Episode"}

    </div>

  );
}

export default SingleShow;
