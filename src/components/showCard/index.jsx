import Badge from '@mui/material/Badge';
import React from 'react'
import styled from 'styled-components'
import { unavailable } from '../../config'
import ContentModal from '../contentModal'
import PeopleModal from '../peopleModal'
import { useNavigate } from 'react-router-dom'
import ReactCountryFlag from "react-country-flag"


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

function calculate_age(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

const ShowCard = ({id, image, name, status, date, rating, type=1, country, countryCode}) => {
  const navigate = useNavigate()
  return (
    <>
      {type && (<CardContainer onClick={() => navigate(`/show/${id}`)}>
        <Badge badgeContent={rating} color={rating > 7 ? 'primary' : 'secondary'}/>
          <img
            style={{borderRadius: "10px"}}
            src={image ? `${image}` : `${unavailable}`}
            alt={name}
          />

      <CardTitle>{name}</CardTitle>
        <CardSubTitle><b>Status</b> {status === "Ended" ? "Completed" : "Ongoing"}</CardSubTitle>
        <CardSubTitle><b>Premiered</b> {date}</CardSubTitle>
      </CardContainer>)}

      {!type && (
        <CardContainer onClick={() => navigate(`/person/${id}`)}>
          <img
            style={{borderRadius: "10px"}}
            src={image ? `${image}` : `${unavailable}`}
            alt={name}
          />

        <CardTitle>{name}</CardTitle>
        <CardSubTitle><b>Age</b>{calculate_age(new Date(date))}</CardSubTitle>
        <CardSubTitle><b>Country</b>{country}
          <ReactCountryFlag
            className="emojiFlag"
            countryCode={countryCode}
            style={{
                fontSize: '1em',
                lineHeight: '1em',
                margin: '2px',
            }}
            aria-label={country}
          />
        </CardSubTitle>
      </CardContainer>)}
    </>

  )
}

export default ShowCard
