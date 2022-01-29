import { AnimatePresence, motion } from 'framer-motion'
import { IoClose, IoSearch } from 'react-icons/io5'
import React, { useEffect, useRef, useState } from 'react';

import MoonLoader from 'react-spinners/MoonLoader'
import styled from 'styled-components'
import { useClickOutside } from 'react-click-outside-hook'

const SearchBarContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 34em;
  height: 3.8em;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
  overflow: hidden;
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
  margin-right: 30px;
  vertical-align: middle;
  transition: all 200ms ease-in-out;
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
  width: 100%;
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
    height: '20em',
  },
  collapsed: {
    height: '3.8em'
  }
}

export const SearchBar = ({}) => {
  const [isExpanded, setExpanded ] = useState(false)
  const [parentRef, isClickedOutside] = useClickOutside()
  const inputRef = useRef()

  const expandContainer = () => {
    setExpanded(true)
  }

  const collapseContainer = () => {
    setExpanded(false)
    if(inputRef.current) inputRef.current.value = ""
  }

  useEffect(() => {
    if(isClickedOutside) collapseContainer()
  }, [isClickedOutside])

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
          />
        <AnimatePresence>
          {isExpanded && (<CloseIcon
            key="close-icon"
            initial = {{ opacity: 0 }}
            animate = {{ opacity: 1 }}
            exit = {{ opacity:0 }}
            onClick={collapseContainer}
            transition = {{ duration: 0.2 }}
            >

            <IoClose />
          </CloseIcon>)}
        </AnimatePresence>
      </SearchInputContainer>
      <LineSeparator />
      <SearchContent>
        <LoadingWrapper>
          <MoonLoader loading color="#000" size={20}/>
        </LoadingWrapper>
      </SearchContent>
    </SearchBarContainer>
  )
};

export default SearchBar;
