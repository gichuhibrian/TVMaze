import './contentModal.css'

import React, {useEffect, useState} from 'react';
import { unavailable, unavailableLandscape } from '../../config'

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Genre from '../genre'
import Modal from '@mui/material/Modal';
import axios from 'axios'
import styled from 'styled-components'
import Carousel from '../carousel'

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


export default function ContentModal({children, id}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [show, setShow] = useState([])


  const fetchShow = async () => {
    const { data } = await axios.get(`https://api.tvmaze.com/shows/${id}`).catch((error) => {
      console.log('shows-error', error)
    })

    if(data) {
      setShow(data)
    }
  }

  useEffect(() => {
    fetchShow()
  }, [])

  return (
    <>
    <CardContainer onClick={handleOpen}>{children}</CardContainer>
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
          {show && (
            <Box sx={style}>
              <div className="ContentModal">
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
                  <Genre genres={show.genres} />

                  <span className="ContentModal__description">
                    {show.summary}
                  </span>

                  <div>
                    <Carousel id={id}/>
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
