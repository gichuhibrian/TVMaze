import React, { useEffect, useState } from 'react';

import ShowCard from '../../components/showCard'
import axios from 'axios'
import styled from 'styled-components'

const SeriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Series = () => {
  const [tvShows, setTvShows] = useState([])

  const fetchSeries = async () => {
    const { data } = await axios.get(`https://api.tvmaze.com/shows`).catch((error) => {
      console.log('shows-error', error)
    })

    if(data) {
      setTvShows(data)
    }
  }

  useEffect(() => {
    fetchSeries()
  }, [])

  return (
    <div>
      <span className="pageTitle">Discover Tv Shows</span>
      <SeriesContainer>
        {tvShows && tvShows.map((show, index) => (
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
      </SeriesContainer>
    </div>
  );

}

export default Series;
