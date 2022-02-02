import React from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const SiteHeader = styled.span`
  width: 100%;
  cursor: pointer;
  position: fixed;
  display: flex;
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
  <SiteHeader onClick={() => navigate('/')}>Tv-Maze</SiteHeader>
);
} 
export default Header;
