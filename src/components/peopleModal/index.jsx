import './peopleModal.css'

import React, {useEffect, useState} from 'react';
import { unavailable, unavailableLandscape } from '../../config'

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import ShowsCarousel from '../showsCarousel'
import Fade from '@mui/material/Fade';
import Genre from '../genre'
import Modal from '@mui/material/Modal';
import ReactCountryFlag from "react-country-flag"
import axios from 'axios'
import styled from 'styled-components'

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  object-fit: contain;
  padding: 10px;

  &:hover {
    background-color: white;
    color: black;
    border-radius: 10px;
    padding: 5px;
    cursor: pointer;
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


export default function PeopleModal({children, id}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [person, setPerson] = useState([])


  const fetchPerson = async () => {
    const { data } = await axios.get(`https://api.tvmaze.com/people/${id}`).catch((error) => {
      console.log('shows-error', error)
    })

    if(data) {
      setPerson(data)
    }
  }

  useEffect(() => {
    fetchPerson()
  }, [])

  return (
    <>
    <CarouselContainer onClick={handleOpen}>{children}</CarouselContainer>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {person && (
            <Box sx={style}>
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
                    <ExtraHeader>Age: </ExtraHeader>
                    {person.birthday}
                  </ExtraContainer>

                  <div>
                    <h3>Other Shows</h3>
                    <ShowsCarousel id={id}/>
                  </div>

                </div>
              </div>
            </Box>
          )}
        </Fade>
      </Modal>
    </>
  );
}
