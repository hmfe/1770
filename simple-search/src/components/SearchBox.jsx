import React from 'react';
import styled from 'styled-components';

const InputField = styled.input`
  padding: 10px 25px;
  border-radius: 4px;
  border: 2px solid #eee;
  margin-bottom: 20px;
  font-size: 14px;
  width: var(--content-width);
  margin-top: 6px;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.025rem #fff, 0 0 0 0.3rem #ffdab9;
  }

  @media (max-width: 768px) {
    width: var(--content-width-mobile);
  }

  @media (min-width: 1440px) {
    width: var(--content-width-large);
  }
`;

const SearchBar = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchBox = ({ placeholder, value, onChange, onKeyDown, labelText }) => {
  return (
    <SearchBar>
      <label>{labelText}</label>
      <InputField
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </SearchBar>
  );
};

export default SearchBox;
