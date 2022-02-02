import React from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';


const HeaderItem = styled.span`
  margin-right: 200px;
  @media (max-width: 1000px) {
    margin-right: 10px;
  }
`;

const SiteHeader = styled.div`
  width: 100%;
  cursor: pointer;
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-transform: uppercase;
  background-color: #39445a;
  font-family: "Montserrat", sans-serif;
  font-size: 3vw;
  padding-bottom: 15px;
  box-shadow: 0px 1px 5px black;
  color: white;
  z-index: 100;

  @media (max-width: 1000px) {
    padding-top: 15px;
    font-size: 6.4vw;
  }
`;

const Header = () => {
  const navigate = useNavigate()

return (
  <SiteHeader onClick={() => navigate('/')}>
    <HeaderItem>
      <Button variant="outlined" color="inherit">Search</Button>
    </HeaderItem>
    <HeaderItem>
      Tv Maze
    </HeaderItem>
  </SiteHeader>
);
}
export default Header;
