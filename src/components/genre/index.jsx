import React from 'react'
import Chip from '@mui/material/Chip';
import styled from 'styled-components'

const GenreContainer = styled.div`
  padding: 6px 0px;
`;

const Genre = ({genres}) => {
  return (
    <GenreContainer>
      {genres && genres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre}
          key={genre}
          size="small"
          color="primary"
        />
      ))}
    </GenreContainer>
  )
}

export default Genre
