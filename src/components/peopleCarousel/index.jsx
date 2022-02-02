import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { noPicture } from "../../config";
import "./carousel.css";
import styled from 'styled-components'
import PeopleModal from '../../components/peopleModal'
import { useNavigate } from 'react-router-dom'

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


const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ id }) => {
  const [casts, setCast] = useState([]);
  const navigate = useNavigate()
  const items = casts.map((cast) => (
      <CarouselContainer onClick={() => navigate(`/person/${cast.person.id}`)}>
      <img
        src={cast.person.image ? cast.person.image.medium : noPicture}
        alt={cast?.person.name}
        onDragStart={handleDragStart}
        className="carouselItem__img"
      />
      <b className="carouselItem__txt">{cast?.person?.name}</b>
    </CarouselContainer>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  const fetchCast = async () => {
    const { data } = await axios.get(`https://api.tvmaze.com/shows/${id}/cast`).catch((error) => {
      console.log('shows-error', error)
    })

    if(data) {
      setCast(data)
    }
  }

  useEffect(() => {
    fetchCast()
  }, [])

  return (
    <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
    />
  );
};

export default Carousel;
