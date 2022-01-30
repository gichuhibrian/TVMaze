import { AnimatePresence, motion } from 'framer-motion'
import { IoClose, IoSearch } from 'react-icons/io5'
import React, { useEffect, useRef, useState } from 'react';

import MoonLoader from 'react-spinners/MoonLoader'
import styled from 'styled-components'
import { useClickOutside } from 'react-click-outside-hook'
import { useDebounce } from '../../hooks/debounceHook'
import axios from 'axios'
import TvShow from '../tvShow'

const SearchBarContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 36em;
  height: 3.8em;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
`;

const SearchInputContainer = styled.div`
  width: 100%;
  min-height: 4em;
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px 15px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  font-size: 21px;
  color: #12112e;
  font-weight: 500;
  border-radius: 6px;
  background-color: transparent;
  &:focus {
    outline: none;
    &::placeholder {
      opacity: 0;
    }
  }
  &::placeholder {
    color: #bebebe;
    transition: all 250ms ease-in-out;
  }
`;

const SearchIcon = styled.span`
  color: #bebebe;
  font-size: 27px;
  margin-right: 10px;
  margin-top: 6px;
  vertical-align: middle;
`;

const CloseIcon = styled(motion.span)`
  color: #bebebe;
  font-size: 23px;
  vertical-align: middle;
  transition: all 200ms ease-in-out;
  margin-right: 30px;
  cursor: pointer;
  &:hover {
    color: #dfdfdf;
  }
`;

const LineSeparator = styled.span`
  display: flex;
  min-width: 100%;
  min-height: 2px;
  background-color: #d8d8d878;
`;

const SearchContent = styled.div`
  width: 94.5%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;
  overflow-y: auto;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const containerTransition = {
  type: 'spring',
  damping: 22,
  stiffness: 150
}

const containerVariants = {
  expanded: {
    height: '30em',
  },
  collapsed: {
    height: '3.8em'
  }
}

export const SearchBar = ({}) => {
  const [isExpanded, setExpanded ] = useState(false)
  const [parentRef, isClickedOutside] = useClickOutside()
  const [searchQuery, setSearchQuery ] = useState("")
  const [isLoading, setLoading] = useState(false)
  const [tvShows, setTvShows] = useState([])
  const inputRef = useRef()

  const isEmpty = !tvShows || tvShows.length === 0;

  const changeHandler = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value)
  }

  const expandContainer = () => {
    setExpanded(true)
  }

  const collapseContainer = () => {
    setExpanded(false)
    setSearchQuery("")
    setLoading(false)
    setTvShows([])
    if(inputRef.current) inputRef.current.value = ""
  }

  useEffect(() => {
    if(isClickedOutside) collapseContainer()
  }, [isClickedOutside])

  const prepareSearchQuery = (query) => {
    const url = `http://api.tvmaze.com/search/shows?q=${query}`;
    return encodeURI(url);
  };

  const searchTvShow = async () => {
    if(!searchQuery || searchQuery.trim() === "")
    return;
    setLoading(true)
    const URL = prepareSearchQuery(searchQuery)
    const response = await axios.get(URL).catch((error) => {
      console.log("Error:", error)
    })
    if(response) {
      console.log("Response:", response.data)
      setTvShows(response.data)
    }
    setLoading(false)
  }

  useDebounce(searchQuery, 500, searchTvShow)

  return (
    <SearchBarContainer
      animate={isExpanded ? 'expanded' : 'collapsed'}
      variants={containerVariants}
      transition={containerTransition}
      ref = {parentRef}
      >
      <SearchInputContainer>
        <SearchIcon>
          <IoSearch />
        </SearchIcon>
        <SearchInput
          placeholder="Search for Series/Shows"
          onFocus = {expandContainer}
          ref = {inputRef}
          value = {searchQuery}
          onChange = {changeHandler}
          />
        <AnimatePresence>
          {isExpanded && (
            <CloseIcon
            key="close-icon"
            initial = {{ opacity: 0 }}
            animate = {{ opacity: 1 }}
            exit = {{ opacity:0 }}
            onClick={collapseContainer}
            transition = {{ duration: 0.2 }}
            >

            <IoClose />
          </CloseIcon>
          )}
        </AnimatePresence>
      </SearchInputContainer>
      {isExpanded && <LineSeparator />}
      {isExpanded && <SearchContent>
        {isLoading && (
          <LoadingWrapper>
          <MoonLoader loading color="#000" size={20}/>
        </LoadingWrapper>
        )}
        {!isLoading && !isEmpty && (
            <>
              {tvShows.map(({ show }) => (
                <TvShow
                  key={show.id}
                  thumbnailSrc={show.image && show.image.medium}
                  name={show.name}
                  rating={show.rating && show.rating.average}
                />
              ))}
            </>
          )}
      </SearchContent>}
    </SearchBarContainer>
  )
};

export default SearchBar;
