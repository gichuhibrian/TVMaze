import Badge from '@mui/material/Badge';
import React from 'react'
import styled from 'styled-components'
import { unavailable } from '../../config'
import ContentModal from '../contentModal'

const CardTitle = styled.b`
  width: 100%;
  text-align: center;
  font-size: 17px;
  padding: 8px 0;
`;

const CardSubTitle = styled.span`
  display: flex;
  justify-content: space-between;
  padding-bottom: 3px;
  padding: 0 2px;
  padding-bottom: 3px;
`;

const ShowCard = ({id, image, name, status, date, rating}) => {
  return (
      <ContentModal id={id}>
        <Badge badgeContent={rating} color={rating > 7 ? 'primary' : 'secondary'}/>
          <img
            style={{borderRadius: "10px"}}
            src={image ? `${image}` : `${unavailable}`}
            alt={name}
          />

      <CardTitle>{name}</CardTitle>
        <CardSubTitle><b>Status</b> {status === "Ended" ? "Completed" : "Ongoing"}</CardSubTitle>
        <CardSubTitle><b>Premiered</b> {date}</CardSubTitle>
      </ContentModal>
  )
}

export default ShowCard
