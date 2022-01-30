import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const TvShowContainer = styled.div`
  width: 97%;
  height:6em;
  display: flex;
  border-bottom: 1px solid #d8d8d852;
  padding: 6px 8px;
  align-items: center;
`;

const Thumbnail = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  flex: 0.4;
  img {
    width: auto;
    height: 100%;
  }
`;

const Name = styled.h3`
  font-size: 15px;
  color: #000;
  margin-left: 10px;
  flex: 2;
  display: flex;
`;

const Rating = styled.span`
  color: #a1a1a1;
  font-size: 16px;
  display: flex;
  flex: 0.2;
`;


const TvShow = ({ thumbnailSrc, name, rating }) => {
  return (
    <TvShowContainer>
      <Thumbnail>
        <img src={thumbnailSrc} />
      </Thumbnail>
      <Name>{name}</Name>
      <Rating>{rating || 'N/A'}</Rating>
    </TvShowContainer>
  )
}

export default TvShow