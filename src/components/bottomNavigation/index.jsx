import React, {useState, useEffect} from 'react';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import TvIcon from '@mui/icons-material/Tv';
import { useNavigate } from 'react-router-dom'


export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    if(value === 0) navigate('/')
    else if(value === 1) navigate('/series')
    else if(value === 2) navigate('/show/2')
  }, [value, navigate])

  return (
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{width: "100%", position: "fixed", bottom: 0, bgcolor: 'text.secondary', color: 'background.paper', zIndex: 100  }}
      >
        <BottomNavigationAction style={{ color: "white" }} label="Search" icon={<SearchIcon />} />
        <BottomNavigationAction style={{ color: "white" }} label="All Shows" icon={<TvIcon />} />
        <BottomNavigationAction style={{ color: "white" }} label="Show" icon={<SearchIcon />} />
      </BottomNavigation>
  );
}
