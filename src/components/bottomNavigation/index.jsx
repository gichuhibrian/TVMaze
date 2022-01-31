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
  }, [value, navigate])

  return (
    <Box sx={{ width: "100%", position: "fixed", bottom: 0, backgroundColor: "#2d313a", zIndex: 100 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Search" icon={<SearchIcon />} />
        <BottomNavigationAction label="All Shows" icon={<TvIcon />} />
      </BottomNavigation>
    </Box>
  );
}
